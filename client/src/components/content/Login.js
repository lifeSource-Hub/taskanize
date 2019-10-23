import React, {Component} from "react";
// import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {AppContext} from "./AppContext";

class Login extends Component
{
  state = {
    usernameInput: "",
    passwordInput: "",

    validUsername: false,
    validPassword: false,
    invalidUsername: false,
    invalidPassword: false,
    usernameFeedback: "",
    passwordFeedback: ""
  };

  // onChangeUsername = (e) =>
  // {
  //   this.setState({usernameInput: e.target.value});
  // };

  // onChangePassword = (e) =>
  // {
  //   this.setState({passwordInput: e.target.value});
  // };

  // onSubmit = (e) =>
  // {
  //   e.preventDefault();
  //
  //   const user = {
  //     username: this.state.usernameInput,
  //     password: this.state.passwordInput
  //   };
  //
  //   console.log("Submitted user: ", user);
  //   const URL = "/api/auth";
  //
  //   axios.post(URL, user)
  //       .then(res =>
  //       {
  //         if (res.data)
  //         {
  //           console.log("Found user: ", res.data);
  //         }
  //         else if (res)
  //         {
  //           console.log(res)
  //         }
  //       })
  //       .catch(() => console.warn(`Can’t access POST '${URL}'`));
  // };

  render()
  {
    return (
        <React.Fragment>
          <fieldset>
            <legend>Test User</legend>
            <Label>Username:</Label>
            <p className="d-inline"> nick</p>
            <br/>
            <Label>Password:</Label>
            <p className="d-inline"> fury</p>
          </fieldset>
          <br/>
          <h2>Login</h2>

          <AppContext.Consumer>
            {context => (
                <Form className="loginForm w-50" onSubmit={context.onSubmit}>
                  <FormGroup>
                    <Label size="sm">Username: </Label>
                    <Input
                        type="text"
                        maxLength="20"
                        bsSize="sm"
                        valid={this.state.validUsername}
                        invalid={this.state.invalidUsername}
                        value={context.state.usernameInput}
                        onChange={context.onChangeUsername}/>
                    {/*<FormFeedback invalid={this.state.invalidUsername.toString()}>*/}
                    {/*  No whitespace or special characters allowed, except dash (-) and underscore (_)*/}
                    {/*</FormFeedback>*/}
                  </FormGroup>
                  <FormGroup>
                    <Label size="sm">Password: </Label>
                    <Input
                        type="text"
                        maxLength="30"
                        bsSize="sm"
                        valid={this.state.validPassword}
                        invalid={this.state.invalidPassword}
                        value={context.state.passwordInput}
                        onChange={context.onChangePassword}/>
                    {/*<FormFeedback invalid={this.state.invalidPassword.toString()}>*/}
                    {/*  No whitespace allowed*/}
                    {/*</FormFeedback>*/}
                  </FormGroup>
                  <Button size="sm" className="bg-success">Login</Button>
                </Form>)}
          </AppContext.Consumer>


        </React.Fragment>);
  }
}

export default Login;
