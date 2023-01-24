import React from "react";
import './style.scss';
import Ahmet from '../../images/ahmet.jpg';

const stil = {

}

const HomePage = () => {


    return (
        <>
            <div style={{ backgroundImage: `url(${require("../../images/homepage.jpeg")})` }} className="main">

                <div className="container">
                    <h1>Simple and Tasty Recipes</h1>
                    <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, voluptates.</h2>
                    <div>
                        <img src={Ahmet} alt="" />
                        <span>by Ahmet Muhiddin Bilgin</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePage;