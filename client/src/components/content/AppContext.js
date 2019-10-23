import React, {Component, createContext} from "react";
import axios from "axios";

export const AppContext = createContext({name: "default"});

export class AppProvider extends Component
{
  state = {
    usernameInput: "",
    passwordInput: "",
  };

  onChangeUsername = (e) =>
  {
    this.setState({usernameInput: e.target.value});
  };

  onChangePassword = (e) =>
  {
    this.setState({passwordInput: e.target.value});
  };

  onSubmit = (e) =>
  {
    e.preventDefault();

    const user = {
      username: this.state.usernameInput,
      password: this.state.passwordInput
    };

    console.log("Submitted user: ", user);

    const URL = "/api/auth";
    axios.post(URL, user)
        .then(res =>
        {
          if (res.data)
          {
            console.log("User search result: ", res.data);
          }
          else if (res)
          {
            console.log(res)
          }
        })
        .catch(() => console.warn(`Can’t access POST '${URL}'`));
  };

  render()
  {
    return (
        <AppContext.Provider value={{
          state: this.state,
          onSubmit: this.onSubmit,
          onChangeUsername: this.onChangeUsername,
          onChangePassword: this.onChangePassword,
        }}>
          {this.props.children}
        </AppContext.Provider>);
  }
}
