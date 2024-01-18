import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const checkLoggedInUser = () => {
  return localStorage.getItem("user");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = checkLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const logIn = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
