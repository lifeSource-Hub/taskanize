import React, {useState, createContext} from "react";

export const AppContext = createContext({});

export const AppProvider = ({children}) =>
{
  const [authUser, setAuthUser] = useState(undefined);

  return (
      <AppContext.Provider value={{authUser, setAuthUser}}>
        {children}
      </AppContext.Provider>);
};
