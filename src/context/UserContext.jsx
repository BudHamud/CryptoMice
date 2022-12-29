import { useState, createContext, useContext, useEffect } from "react";

const userContext = createContext([]);

export const useUserContext = () => useContext(userContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const usuario = (e) => {
    setUser(e)
  }

  useEffect(() => {
    usuario({
      nombre: "Claudio",
      mp: 3000,
      chez: 0,
      chezGet: 0,
    });
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        usuario
      }}
    >
      {children}
    </userContext.Provider>
  );
};
