import React, {useContext} from 'react'
import "./style.css"
import { RecipeContext } from '../../Context'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
const NavBar = () => {

  const {currentUser} = useContext(RecipeContext)
  const location = useLocation()
  /* Window.location ifadesi ile url deki değere erişiyoruz sonrasında ise  eğer location.pathname / veya Login ekranında ise
  sadece navigasyon barda resmi bas eğer değilse mevcut kullanıcının ismi ile birlikte bas. useLocation ile birlikte geri dönüş yaptığımız 
  zaman navigation bar rerender edilir ve değer hep güncelleşir. */
  return (
    <div className='navigation-bar'>
          {/* <img className='logo' alt='logo' src='../images/recipe-book.png' />  
          {currentUser === null ? "" : <motion.h2 
          initial={{x:-100}}
          animate={{x:0}}
          >Welcome {currentUser}</motion.h2>} */}
          {window.location.pathname === "/" || window.location.pathname === "/Login" ? <img className='logo' alt='logo' src='../images/recipe-book.png' /> 
          : currentUser === null ? "" : <>
          <img className='logo' alt='logo' src='../images/recipe-book.png' /> 
          <motion.h2 
          initial={{x:-100}}
          animate={{x:0}}
          >Welcome {currentUser}</motion.h2> </>}  
    </div>
  )
}

export default NavBar;