import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import User from "../pages/userPage/index";
import LoginScreen from "../pages/loginPage/index";
import Home from "../pages/homePage/index";
import MeatRecipe from "../pages/recipePages/meatRecipePage/Index";
import CoffeeRecipe from "../pages/recipePages/coffeeRecipePage/Index";
import DessertRecipe from "../pages/recipePages/dessertRecipePage/Index";
import VegetableRecipe from "../pages/recipePages/vegetableRecipePage/Index";
import SoupRecipe from "../pages/recipePages/soupRecipePage/Index";
import PastryRecipe from "../pages/recipePages/pastryRecipePage/Index";

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/meatRecipe" element={<MeatRecipe />} />
        <Route path="/vegetableRecipe" element={<VegetableRecipe />}/>
        <Route path="/dessertRecipe" element={<DessertRecipe />} />
        <Route path="/coffeeRecipe" element={<CoffeeRecipe />} />
        <Route path="/soupRecipe" element={<SoupRecipe />} />
        <Route path="/pastryRecipe" element={<PastryRecipe />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;