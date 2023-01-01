import React, {useContext} from "react";
import "./style.css"
import { useParams, useNavigate } from "react-router-dom";
import { RecipeContext } from "../../Context";
import { motion } from "framer-motion";

const User = () => {
  /*yeni bir state belirledik (currentUser,setCurentUser) bunun sebebi login olduktan sonra AnimatedRoutes
  componentinde birsonraki Route gececek oradaki path property içerisindeki id yoluna erişmek.
  UserPage de id yi set ediyoruz yani currentUser'ımız id olsun diyoruz sonra navbar da değişen currentUser
  state'ini yakalıyoruz..*/
  const { id } = useParams();
  const {setCurrentUser} = useContext(RecipeContext)
  setCurrentUser(id)
  const navigate = useNavigate()
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.5}}
    className="user-area">
      <div onClick={() => navigate(`/meatRecipe`)} className="meat-meal">
      <img src="../images/meat-meal.jpg" /> 
      <p>Meat Recipes</p>
      </div>
      <div onClick={() => navigate(`/vegetableRecipe`)} className="vegetable-meal">
      <img src="../images/vegetable-meal.jpg" />
      <p>Vegetable Recipes</p>
      </div>
      <div onClick={() => navigate(`/dessertRecipe`)} className="dessert-meal">
      <img src="../images/dessert-meal.jpg" />
      <p>Dessert Recipes</p>
      </div>
      <div onClick={() => navigate(`/coffeeRecipe`)} className="coffee-meal">
      <img src="../images/coffee-meal.jpg"/>
      <p>Coffee Recipes</p>
      </div>
      <div onClick={() => navigate(`/soupRecipe`)} className="soup-meal">
      <img src="../images/soup-meal.jpg" />
      <p>Soup Recipes</p>
      </div>
      <div onClick={() => navigate(`/pastryRecipe`)} className="pastry-meal">
      <img src="../images/pastry-meal.jpg" />
      <p>Pastry Recipes</p>
      </div>
    </motion.div>
  );
};

export default User;
