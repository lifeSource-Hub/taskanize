import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Toast,
  ToastHeader,
  ToastBody
} from "reactstrap";

const Login = () =>
{
  const [loginFeedback, setLoginFeedback] = useState(null);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const onChangeUsername = e =>
  {
    setUsername(e.target.value);
  };

  const onChangePassword = e =>
  {
    setPassword(e.target.value);
  };

  const onSubmit = e =>
  {
    e.preventDefault();

    const user = {
      username: username,
      password: password
    };

    // console.log("Submitted credentials: ", user);
    const URL = "/api/login";

    axios.post(URL, user)
      .then(res =>
      {
        if (res.status === 200)
        {
          localStorage.setItem("currentUser", user.username);
          localStorage.setItem("authToken", res.data.authToken);
          localStorage.setItem("userId", res.data.userId);
          window.location.replace("/tasks");
        }
      })
      .catch(err =>
      {
        setLoginFeedback(err.response.data.msg);
        console.warn(`Can’t access POST '${URL}'`);
      });
  };

  return (
    <>
      <h2>Login</h2>
      <p>
        Please login to access your list.
        <br/>
        <br/>
        Want to explore the site without creating an account? Then use the guest account provided
        below.
      </p>

      <Toast>
        <ToastHeader>Guest Account</ToastHeader>
        <ToastBody>
          <p>Username: Guest</p>
          <p>Password: pass123</p>
        </ToastBody>
      </Toast>

      <Form className="loginForm" onSubmit={onSubmit}>
        <FormGroup>
          <Label size="sm">Username: </Label>
          <Input
            autoFocus
            type="text"
            maxLength="18"
            bsSize="sm"
            value={username}
            onChange={onChangeUsername}
          />
        </FormGroup>
        <FormGroup>
          <Label size="sm">Password: </Label>
          <Input
            type="password"
            maxLength="40"
            bsSize="sm"
            value={password}
            onChange={onChangePassword}
          />
        </FormGroup>
        <p className="loginFeedback">{loginFeedback}</p>
        <br/>
        <Button size="sm" className="bg-success">
          Login
        </Button>
      </Form>
      <br/>
      <p>
        <Link to="/register">Click here to register</Link>
      </p>
    </>
  );
};

export default Login;
