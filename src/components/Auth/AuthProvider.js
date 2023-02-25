import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let authLocalStorage = {};
  try {
    const { isLoggedIn, user, role } = JSON.parse(
      localStorage.getItem("CakeStore")
    );
    authLocalStorage = { user: isLoggedIn ? user : "", role: role };
  } catch (err) {
    authLocalStorage = {};
  }
  const [auth, setAuth] = useState(authLocalStorage);

  console.log("auth :>> ", auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
