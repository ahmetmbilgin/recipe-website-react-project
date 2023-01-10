import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import RestApi from '../RestApi';
import './pages.css';

const Drinks = () => {

    const [receipeList, setReceipeList] = useState([]);

    useEffect(() => {
        setReceipeList([]);
        RestApi.getReceipe('drinks')
            .then(response => setReceipeList(response.data))
    }, []);

    return (
        <div className="card-list">
            {receipeList.map((receipeObj, index) => <Card key={index} receipeObj={receipeObj} />)}
        </div>
    )
}

export default Drinks;