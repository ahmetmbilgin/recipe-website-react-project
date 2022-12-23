import React, { useState } from 'react'
import { RecipeContext, useContext } from "../../Context";
import Fruits from "../loginPage/home-food-image.jpg";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./Login.css"
import axios from 'axios';

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

  const { login, setLogin, loginErr, setLoginErr } = useContext(RecipeContext);

  const handleSetInputs = (value) => {
    setLogin((prevState) => ({
      ...prevState,
      ...value
    }))
  }

  const [token, setToken] = useState({ name: '' })
  const [incorrectEntry, setIncorrectEntry] = useState(false)
  const handleLogin = (e) => {

    setLoginErr(login);
    if (Object.values(login).every((value) => value)) {
      setLogin({ name: "", password: "" })
      const getUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4600/users')
          const userNames = response.data.map(userObject => userObject.name)
          const userPasswords = response.data.map(userObject => userObject.password)
          if (userNames.includes(login.name) && userPasswords.includes(login.password)) {
            setToken({ name: login.name });
            setIncorrectEntry(false);
          } else {
            setIncorrectEntry(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
      getUsers()
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
            <Link to='' onClick={handleLogin} className="logging">
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