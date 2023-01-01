import { onAuthStateChanged } from "firebase/auth";
import { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../firebase/config";
import getUser from "../hooks/getUser";

const userContext = createContext([]);

export const useUserContext = () => useContext(userContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [fleet, setFleet] = useState('')
  const [actu, setActu] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser([]);
    });
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        fleet,
        actu,
        setActu,
        setFleet
      }}
    >
      {children}
    </userContext.Provider>
  );
};
