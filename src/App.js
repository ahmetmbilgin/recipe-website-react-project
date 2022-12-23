import "./App.css";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { RecipeContext } from "./Context";
import { useState } from "react";
import NavBar from "./components/navigationBar/Index";

function App() {
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
  };
  return (
    <RecipeContext.Provider value={data}>
      <NavBar />
      <AnimatedRoutes />
    </RecipeContext.Provider>
  );
}

export default App;
