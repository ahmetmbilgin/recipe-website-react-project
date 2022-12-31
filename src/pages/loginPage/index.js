import React, { useState } from 'react'
import { RecipeContext, useContext } from "../../Context";
import Fruits from '../images/fruits.jpg'
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./style.css"
import { stil } from '../homePage/index';

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
    if (users.some(user => user.name === login.name && user.password === login.password)) {
      return true;
    } else { return false; }
  }

  const handleLogin = (e) => {
    setLoginErr(login);
    if (Object.values(login).every((value) => value)) {
      setLogin({ name: "", password: "" })
      if (loginControl()) {
        setIncorrectEntry(false);
        localStorage.setItem("name", login.name)
      } else {
        setIncorrectEntry(true);
      }
    }
  }

  return (
    <div className='picture-div' style={{ backgroundImage: `url(${Fruits})` }}>
      <motion.div
        className="loginPage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
        exit={{ opacity: 0.5 }}
      >
        {localStorage.getItem("name") ?

          //Üye girişi varsa aşağıdaki fragmentların arasına loginPage'de nelerin gösterileceği yazılacak
          <>
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
                    This are shouldnt be empty !
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
                    This are shouldnt be empty !
                  </p>
                )}
              </form>
              {incorrectEntry ? <p>Name and password don't match !</p> : null}
              <div>
                <Link to={loginControl() && `/user/${login.name}`}
                  onClick={handleLogin} className="logging">
                  Login
                </Link>
                <Link to="/" onClick={() => {
                  setLoginErr({
                    name: true,
                    password: true,
                  })
                  setLogin({ name: "", password: "" })
                }} className="anchor-btn">Back</Link>
              </div>
            </div></> :
          <>

          </>}
      </motion.div>
    </div>
  )
}

export default LoginScreen;