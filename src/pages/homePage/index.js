import React, { useState } from "react";
import Fruits from '../images/fruits.jpg'
import { motion } from "framer-motion";
import { RecipeContext, useContext } from "../../Context";
import { Link } from "react-router-dom";
import "./style.css"
import axios from "axios";

export const stil = {
  h2: {
    margin: "1rem",
    position: "absolute",
    bottom: "100%",
  }
}

const Home = () => {
  const {
    signUp,
    setSignUp,
    isLogin,
    setIsLogin,
    signUpErr,
    setSignUpErr,
    users,
    usersFecth,
    setUsersFetch,
  } = useContext(RecipeContext);

  const [userNameError, setUserNameError] = useState(false);
  const handleSignUp = (e) => {

    const creatingUser = async () => {
      await axios.post('http://localhost:4600/users', signUp);
    }

    setSignUpErr(signUp);
    if (signUp.password !== signUp.verifyPassword) {
      e.preventDefault();
      alert("Şifreler uyuşmuyor");
      setIsLogin(true);
    }
    else if (signUpErr.name === false) {
      e.preventDEfault();
      setIsLogin(true);
    }
    else {
      if (Object.values(signUp).every((value) => value)) {
        if (users.some(user => user.name === signUp.name)) {
          setUserNameError(true);
        } else {
          usersFecth ? setUsersFetch(false) : setUsersFetch(true)
          creatingUser();
          setSignUp({ name: "", password: "", verifyPassword: "" });
          setIsLogin(false);
          setUserNameError(false);
        }
      }
    }
  };
  const handleSetSignUpInputs = (value) => {
    setSignUp((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  return (
    <div>
      <div className="picture-div"
        style={{ backgroundImage: `url(${Fruits})` }}
      ></div>
      <motion.div
        className="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
        exit={{ opacity: 0.5 }}
      >
        <div className="signUp-div">
          <form>
            <motion.h2
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              style={stil.h2}
            >
              Welcome To Among Us
            </motion.h2>
            <input
              onChange={(e) => handleSetSignUpInputs({ name: e.target.value })}
              type="text"
              placeholder="name"
              value={signUp.name}
            />
            {signUpErr.name ? (
              ""
            ) : (
              <p>
                This are shouldnt be empty !
              </p>
            )}
            <hr />
            <input
              onChange={(e) =>
                handleSetSignUpInputs({ password: e.target.value })
              }
              type="password"
              placeholder="password"
              value={signUp.password}
            />
            {signUpErr.password ? (
              ""
            ) : (
              <p>
                This are shouldnt be empty !
              </p>
            )}
            <hr />
            <input
              onChange={(e) =>
                handleSetSignUpInputs({ verifyPassword: e.target.value })
              }
              type="password"
              placeholder="verify password"
              value={signUp.verifyPassword}
            />
            {signUpErr.verifyPassword ? (
              ""
            ) : (
              <p>
                This are shouldnt be empty !
              </p>
            )}
          </form>
          {userNameError ? <p>Username already taken!</p> : null}
          <div>
            <Link
              to={isLogin ? "/Login" : null}
              onClick={handleSignUp}
              className="register"
            >
              Register
            </Link>
            <Link to="/Login" onClick={() => {
              setSignUp({ name: "", password: "", verifyPassword: "" });
              setSignUpErr({
                name: true,
                password: true,
                verifyPassword: true,
              })
            }} className="anchor-btn">
              I already have an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
