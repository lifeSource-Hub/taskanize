import React, {useState, createContext} from "react";

export const AppContext = createContext({});

export const AppProvider = ({children}) =>
{
  const [authUser, setAuthUser] = useState(undefined);

  // const setToken = (token) =>
  // {
  //   // console.log("Inside setToken, value received: ", token);
  //   setAuthUser(token);
  // };

  return (
      <AppContext.Provider value={{authUser, setAuthUser}}>
        {children}
      </AppContext.Provider>);
};
