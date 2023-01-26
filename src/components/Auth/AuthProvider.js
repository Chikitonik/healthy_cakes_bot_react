import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let authLocalStorage = {};
  try {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("user");
    const role = +localStorage.getItem("role");
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
