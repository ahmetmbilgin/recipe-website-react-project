import React from 'react'
import "./style.css"
import { RecipeContext, useContext } from '../../Context'
import { motion } from 'framer-motion'
const NavBar = () => {

  const {currentUser} = useContext(RecipeContext)
  return (
    <div className='navigation-bar'>
          <img className='logo' alt='logo' src='./images/recipe-book.png' />  
          {currentUser === null ? "" : <motion.h2 
          initial={{x:-100}}
          animate={{x:0}}
          >Welcome {currentUser}</motion.h2>}
    </div>
  )
}

export default NavBar;