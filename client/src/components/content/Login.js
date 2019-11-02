import React, {useState} from "react";
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
            localStorage.setItem("authToken", res.data);
            window.location.replace("/list");
          }
        })
        .catch((err) =>
        {
          setLoginFeedback(err.response.data.msg);
          console.warn(`Can’t access POST '${URL}'`)
        });
  };

  return (
      <React.Fragment>
        <h2>Login</h2>
        <p>New accounts cannot be registered at this time, please
          use the login information provided below.</p><br/>
        <Toast>
          <ToastHeader>Sample Account</ToastHeader>
          <ToastBody>
            <p>Username: Nick</p>
            <p>Password: fury</p>
          </ToastBody>
        </Toast>
        <br/>

        <Form className="loginForm" onSubmit={onSubmit}>
          <FormGroup>
            <Label size="sm">Username: </Label>
            <Input
                autoFocus
                type="text"
                maxLength="18"
                bsSize="sm"
                value={username}
                onChange={onChangeUsername}/>
          </FormGroup>
          <FormGroup>
            <Label size="sm">Password: </Label>
            <Input
                type="password"
                maxLength="40"
                bsSize="sm"
                value={password}
                onChange={onChangePassword}/>
          </FormGroup>
          <p className="loginFeedback">{loginFeedback}</p><br/>
          <Button size="sm" className="bg-success"> Login </Button>
        </Form>
      </React.Fragment>);
};

export default Login;
