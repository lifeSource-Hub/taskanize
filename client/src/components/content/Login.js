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
  const [username, setUsername] = useState({
    input: "",
    valid: false,
    invalid: false,
    feedback: ""
  });

  const [password, setPassword] = useState({
    input: "",
    valid: false,
    invalid: false,
    feedback: ""
  });

  const onChangeUsername = e =>
  {
    setUsername({...username, input: e.target.value});
  };

  const onChangePassword = e =>
  {
    setPassword({...password, input: e.target.value});
  };

  const onSubmit = e =>
  {
    e.preventDefault();

    const user = {
      username: username.input,
      password: password.input
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
        .catch(() => console.warn(`Can’t access POST '${URL}'`));
  };

  return (
      <React.Fragment>
        <h2>Login</h2>
        <p>New accounts cannot be registered at this time, please
          use the login information provided below.</p><br/>
        <Toast>
          <ToastHeader>Sample Account</ToastHeader>
          <ToastBody>
            <p>Username: nick</p>
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
                maxLength="20"
                bsSize="sm"
                valid={username.valid}
                invalid={username.invalid}
                value={username.input}
                onChange={onChangeUsername}/>
            {/*<FormFeedback invalid={this.state.invalidUsername.toString()}>*/}
            {/*  No whitespace or special characters allowed, except dash (-) and underscore (_)*/}
            {/*</FormFeedback>*/}
          </FormGroup>
          <FormGroup>
            <Label size="sm">Password: </Label>
            <Input
                type="password"
                maxLength="30"
                bsSize="sm"
                valid={password.valid}
                invalid={password.invalid}
                value={password.input}
                onChange={onChangePassword}/>
            {/*<FormFeedback invalid={this.state.invalidPassword.toString()}>*/}
            {/*  No whitespace allowed*/}
            {/*</FormFeedback>*/}
          </FormGroup>
          <Button size="sm" className="bg-success">
            Login
          </Button>
        </Form>
      </React.Fragment>);
};

export default Login;
