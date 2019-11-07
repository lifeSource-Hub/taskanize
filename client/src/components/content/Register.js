import React, {useState} from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";

const Register = () =>
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [invalidInput, setInvalidInput] = useState({
    username: false,
    password: false,
    passConfirm: false
  });

  const [formFeedback, setFormFeedback] = useState({
    username: "",
    password: "",
    submission: ""
  });

  const onChangeUsername = (e) =>
  {
    setUsername(e.target.value);

    if (invalidInput.username)
    {
      validateUsername(e.target.value);
    }
  };

  const onChangePassword = (e) =>
  {
    setPassword(e.target.value);

    if (invalidInput.password)
    {
      validatePassword(e.target.value);
    }
  };

  const onChangePasswordConfirm = (e) =>
  {
    setPassConfirm(e.target.value);

    if (invalidInput.passConfirm)
    {
      validatePasswordMatch(e.target.value);
    }
  };

  // Only validate after exit focus or currently invalid
  const validateUsername = (input = username) =>
  {
    const hasDisallowedChars = input.search(/[^a-zA-Z_\-0-9]/) >= 0;
    const hasMinChars = input.search(/^.{3,18}$/) >= 0;
    const hasLetterOrNum = input.search(/[a-zA-Z0-9]+/) >= 0;

    if (hasDisallowedChars)
    {
      setFormFeedback({
        ...formFeedback, username: "No whitespace or special " +
            "characters allowed, except dash (-) and underscore (_)"
      });
    }
    else if (!hasMinChars || !hasLetterOrNum)
    {
      setFormFeedback({
        ...formFeedback, username: "Must be 3–18 characters " +
            "and have at least one alphanumeric character"
      });
    }

    setInvalidInput({
      ...invalidInput,
      username: (hasDisallowedChars || !hasMinChars || !hasLetterOrNum)
    });
  };

  // Only validate after exit focus or currently invalid
  const validatePassword = (input = password) =>
  {
    const hasWhitespace = input.search(/\s/) >= 0;
    const hasMinChars = input.search(/^.{6,40}$/) >= 0;

    if (hasWhitespace)
    {
      setFormFeedback({...formFeedback, password: "No whitespace allowed"});
    }
    else if (!hasMinChars)
    {
      setFormFeedback({...formFeedback, password: "Must be 6–40 characters"});
    }

    setInvalidInput({...invalidInput, password: (!hasMinChars || hasWhitespace)});
  };

  // Only validate after exit focus or currently invalid
  const validatePasswordMatch = (input = passConfirm) =>
  {
    setInvalidInput({...invalidInput, passConfirm: (input !== password)});
  };

  const onSubmit = (e) =>
  {
    e.preventDefault();

    if (!invalidInput.username && !invalidInput.password && !invalidInput.passConfirm)
    {
      const user = {
        username: username,
        password: password
      };

      // console.log("Submitted user: ", user);
      const URL = "/api/register";

      axios.post(URL, user)
          .then(res =>
          {
            if (res.status === 201)
            {
              window.alert("Registration successful! You will now be re-directed to login.");
              window.location.replace("/login");
            }
          })
          .catch((err) =>
          {
            switch (err.response.status)
            {
              case 409:
                setFormFeedback({...formFeedback, submission: "That username is taken"});
                setInvalidInput({...invalidInput, username: true});
                break;
              case 507:
                setFormFeedback({
                  ...formFeedback,
                  submission: "The maximum number of registered users has been reached. " +
                      "This is very unusual and likely the result of malicious behavior. " +
                      "Our developers are working hard to resolve the issue. " +
                      "We apologize for any inconvenience."
                });
                setInvalidInput({...invalidInput, username: true});
                break;
              default:
                console.warn(`Could not register user`);
            }
          });
    }
  };

  return (
      <React.Fragment>
        <h2>Register</h2>
        <Form className="registrationForm" onSubmit={onSubmit}>
          <p className="formErrorResponse">{formFeedback.submission}</p>
          <FormGroup>
            <Label size="sm">Username: </Label>
            <Input
                autoFocus
                type="text"
                maxLength="18"
                bsSize="sm"
                invalid={invalidInput.username}
                value={username}
                onChange={onChangeUsername}
                onBlur={() =>
                {
                  if (username)
                  {
                    validateUsername();
                  }
                }}/>
            <FormFeedback valid={!invalidInput.username}>
              {formFeedback.username}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label size="sm">Password: </Label>
            <Input
                type="password"
                maxLength="40"
                bsSize="sm"
                invalid={invalidInput.password}
                value={password}
                onChange={onChangePassword}
                onBlur={() =>
                {
                  if (password)
                  {
                    validatePassword();
                  }
                }}/>
            <FormFeedback valid={!invalidInput.password}>
              {formFeedback.password}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label size="sm">Confirm Password: </Label>
            <Input
                type="password"
                maxLength="40"
                bsSize="sm"
                invalid={invalidInput.passConfirm}
                value={passConfirm}
                onChange={onChangePasswordConfirm}
                onBlur={() =>
                {
                  if (passConfirm)
                  {
                    validatePasswordMatch();
                  }
                }}/>
            <FormFeedback valid={!invalidInput.passConfirm}>
              Passwords do not match
            </FormFeedback>
          </FormGroup>
          <Button size="sm" className="bg-success">Submit</Button>
        </Form>
      </React.Fragment>);
};

export default Register;
