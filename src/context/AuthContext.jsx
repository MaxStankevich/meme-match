import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const checkLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = checkLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setIsLoading(false);
  }, []);

  const logIn = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
