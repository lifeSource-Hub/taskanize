import React, {useState} from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  // FormFeedback,
  Label,
  Input,
} from "reactstrap";

const Register = () =>
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

  const [passwordConfirm, setPasswordConfirm] = useState({
    input: "",
    valid: false,
    invalid: false,
    feedback: ""
  });

  const onChangeUsername = (e) =>
  {
    setUsername({...username, input: e.target.value});

    // if (username.invalid)
    // {
    //   validateUsername();
    // }
  };

  const onChangePassword = (e) =>
  {
    setPassword({...password, input: e.target.value});

    // if (password.invalid)
    // {
    //   validatePassword();
    // }
  };

  const onChangeConfirmPassword = (e) =>
  {
    setPasswordConfirm({...passwordConfirm, input: e.target.value});

    // if (passwordConfirm.invalid)
    // {
    //   validatePassword();
    // }
  };

  // Only perform validation after exit focus or currently invalid
  // const validateUsername = () =>
  // {
  //   if (username.input.search(/[^a-zA-Z_\-0-9]/) >= 0)
  //   {
  //     setUsername({
  //       ...username,
  //       valid: false,
  //       invalid: true
  //     });
  //   }
  //   else
  //   {
  //     setUsername({
  //       ...username,
  //       valid: true,
  //       invalid: false
  //     });
  //   }
  // };

  // Only perform validation after exit focus or currently invalid
  // const validatePassword = () =>
  // {
  //   if (password.input.search(/\s/) >= 0)
  //   {
  //     setPassword({
  //       ...password,
  //       valid: false,
  //       invalid: true
  //     });
  //   }
  //   else
  //   {
  //     setPassword({
  //       ...password,
  //       valid: true,
  //       invalid: false
  //     });
  //   }
  // };

  const onSubmit = (e) =>
  {
    e.preventDefault();

    if (username.valid && password.valid)
    {
      const user = {
        username: username.input,
        password: password.input
      };

      console.log("Submitted user: ", user);
      const URL = "/api/register";
      // TODO Update the console message in catch
      axios.post(URL, user)
          .then(res =>
          {
            // console.log(res.data);
            switch (res.status)
            {
              case 200:
                  window.location.replace("/login");
                break;
              case 409:

              default:
            }
          })
          .catch(() => console.warn(`Could not register user`));
    }
  };

  // TODO Add second password input for confirmation
    return (
        <React.Fragment>
          <h2>Register</h2>
          <Form className="w-50" onSubmit={onSubmit}>
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
                  onChange={onChangeUsername}
                  />
              {/*<FormFeedback invalid={state.invalidUsername.toString()}>*/}
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
                  onChange={onChangePassword}
                  />
            </FormGroup>
            <FormGroup>
              <Label size="sm">Confirm Password: </Label>
              <Input
                  type="password"
                  maxLength="30"
                  bsSize="sm"
                  valid={passwordConfirm.valid}
                  invalid={passwordConfirm.invalid}
                  value={passwordConfirm.input}
                  onChange={onChangeConfirmPassword}

              />
              {/*<FormFeedback invalid={state.invalidPassword.toString()}>*/}
              {/*  No whitespace allowed*/}
              {/*</FormFeedback>*/}
            </FormGroup>
            <Button size="sm" className="bg-success">Submit</Button>
          </Form>
        </React.Fragment>);
};

export default Register;
