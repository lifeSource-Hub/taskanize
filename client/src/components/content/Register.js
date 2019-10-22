import React, {Component} from "react";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";

class Register extends Component
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

  onChangeUsername = (e) =>
  {
    this.setState({usernameInput: e.target.value});

    if (this.state.invalidUsername)
    {
      this.validateUsername();
    }
  };

  onChangePassword = (e) =>
  {
    this.setState({passwordInput: e.target.value});

    if (this.state.invalidPassword)
    {
      this.validatePassword();
    }
  };

  // Only perform validation after exit focus or currently invalid
  validateUsername = () =>
  {
    if (this.state.usernameInput.search(/[^a-zA-Z_\-0-9]/) >= 0)
    {
      this.setState({
        validUsername: false,
        invalidUsername: true
      });
    }
    else
    {
      this.setState({
        validUsername: true,
        invalidUsername: false
      });
    }
  };

  // Only perform validation after exit focus or currently invalid
  validatePassword = (e) =>
  {
    if (this.state.passwordInput.search(/\s/) >= 0)
    {
      this.setState({
        validPassword: false,
        invalidPassword: true
      });
    }
    else
    {
      this.setState({
        validPassword: true,
        invalidPassword: false
      });
    }
  };

  onSubmit = (e) =>
  {
    e.preventDefault();

    if (this.state.validUsername && this.state.validUsername)
    {
      const user = {
        username: this.state.usernameInput,
        password: this.state.passwordInput
      };

      console.log(`Submitted user: ${JSON.stringify(user)}`);
      // const URL = "";
      // // TODO Update the console message in catch
      // axios.post(URL, newItem)
      //     .then(res =>
      //     {
      //       this.setState({});
      //     })
      //     .catch(() => console.warn(`Can’t access '${URL}'`));
    }
  };

  // TODO Add second password input for confirmation
  render()
  {
    return (
        <React.Fragment>
          <h2>Register</h2>
          <Form className="w-50" onSubmit={this.onSubmit}>
            <FormGroup>
              <Label size="sm">Username: </Label>
              <Input
                  type="text"
                  maxLength="20"
                  bsSize="sm"
                  valid={this.state.validUsername}
                  invalid={this.state.invalidUsername}
                  value={this.state.usernameInput}
                  onChange={this.onChangeUsername}
                  onBlur={this.validateUsername}/>
              <FormFeedback invalid={this.state.invalidUsername.toString()}>
                No whitespace or special characters allowed, except dash (-) and underscore (_)
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label size="sm">Password: </Label>
              <Input
                  type="password"
                  maxLength="30"
                  bsSize="sm"
                  valid={this.state.validPassword}
                  invalid={this.state.invalidPassword}
                  value={this.state.passwordInput}
                  onChange={this.onChangePassword}
                  onBlur={this.validatePassword}/>
              <FormFeedback invalid={this.state.invalidPassword.toString()}>
                No whitespace allowed
              </FormFeedback>
            </FormGroup>
            <Button size="sm" className="bg-success">Submit</Button>
          </Form>
        </React.Fragment>);
  }
}

export default Register;
