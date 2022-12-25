import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();

  console.log(id)
  return (
    <div style={{position:"absolute", top: "100px"}}>
      <h1>Welcome here {id} </h1>
    </div>
  );
};

export default User;
