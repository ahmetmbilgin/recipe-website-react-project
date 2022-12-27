import React from "react";
import "./style.css"
import { useParams } from "react-router-dom";
import { RecipeContext, useContext } from "../../Context";

const User = () => {
  /*yeni bir state belirledik (currentUser,setCurentUser) bunun sebebi login olduktan sonra AnimatedRoutes
  componentinde birsonraki Route gececek oradaki path property içerisindeki id yoluna erişmek.
  UserPage de id yi set ediyoruz yani currentUser'ımız id olsun diyoruz sonra navbar da değişen currentUser
  state'ini yakalıyoruz..*/
  const { id } = useParams();
  const {setCurrentUser} = useContext(RecipeContext)
  setCurrentUser(id)
  return (
    <div className="user-info">

    </div>
  );
};

export default User;
