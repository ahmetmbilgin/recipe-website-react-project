import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./homePage/Index";
import LoginScreen from "./loginPage/Index";
import { RecipeContext, useContext } from "../Context";

const AnimatedRoutes = () => {

  const location = useLocation();

  // const [login] = useContext(RecipeContext)
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginScreen />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;