import React from "react";
import { RecipeContext } from "../Context";
import { useState, useEffect } from "react";
import axios from "axios";

const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [signUp, setSignUp] = useState({
    name: "",
    password: "",
    verifyPassword: "",
  });
  const [signUpErr, setSignUpErr] = useState({
    name: true,
    password: true,
    verifyPassword: true,
  });
  const [login, setLogin] = useState({ name: "", password: "" });
  const [loginErr, setLoginErr] = useState({ name: true, password: true });
  const [users, setUsers] = useState([]);
  const [usersFecth, setUsersFetch] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4600/users");
        setUsers(response.data.map((user) => user));
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [usersFecth])

  const data = {
    isLogin,
    setIsLogin,
    signUp,
    setSignUp,
    login,
    setLogin,
    signUpErr,
    setSignUpErr,
    loginErr,
    setLoginErr,
    users,
    setUsers,
    usersFecth,
    setUsersFetch,
    currentUser,
    setCurrentUser,
  };

  return (
    <RecipeContext.Provider value={data}>
      {children}
    </RecipeContext.Provider>
  );
};

export default ContextProvider;
