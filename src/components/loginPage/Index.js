import React, { useEffect, useState } from 'react'
import { RecipeContext, useContext } from "../../Context";
import Fruits from "../loginPage/home-food-image.jpg";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./Login.css"

const stil = {
  picture: {
    backgroundImage: `url(${Fruits})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    width: "50%",
    height: "100vh",
    backgroundSize: "cover",
  },
  h2: {
    margin: "1rem",
    position: "absolute",
    bottom: "100%",
  }
}

const LoginScreen = () => {

  const { login, setLogin, loginErr, setLoginErr, users } = useContext(RecipeContext);

  const [incorrectEntry, setIncorrectEntry] = useState(false)

  const handleSetInputs = (value) => {
    setLogin((prevState) => ({
      ...prevState,
      ...value
    }))
  }



  const loginControl = () => {
    if (users.some(user => user.name === login.name) && users.some(user => user.password === login.password)) {
      return true;
    } else { return false; }
  }

  const handleLogin = (e) => {
    setLoginErr(login);
    if (Object.values(login).every((value) => value)) {
      setLogin({ name: "", password: "" })
      if (loginControl()) {
        setIncorrectEntry(false);
      } else {
        setIncorrectEntry(true);
      }
    }
  }

  return (
    <div style={stil.picture}>
      <motion.div
        className="loginPage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="login-div">
          <form>
            <motion.h2
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              style={stil.h2}
            >
              Welcome To Among Us
            </motion.h2>
            <input
              onChange={(e) => handleSetInputs({ name: e.target.value })}
              type="text"
              placeholder="name"
              value={login.name}
            />
            {loginErr.name ? (
              ""
            ) : (
              <p className='error'>
                This are shouldnt be empty
              </p>
            )}
            <hr style={{ borderColor: "darkgray" }} />
            <input
              onChange={(e) => handleSetInputs({ password: e.target.value })}
              type="password"
              placeholder="password"
              value={login.password}
            />
            {loginErr.password ? (
              ""
            ) : (
              <p className='error'>
                This are shouldnt be empty
              </p>
            )}
          </form>
          {incorrectEntry ? <p>Email and password don't match !</p> : null}
          <div>
            <Link to={loginControl() && `/${login.name}`}
              onClick={handleLogin} className="logging">
              Login
            </Link>
            <Link to="/" className="anchor-btn">Back</Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginScreen;