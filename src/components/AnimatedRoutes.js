import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./homePage/Index";
import LoginScreen from "./loginPage/Index";
import User from "./UserPage/Index";

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;