import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import RestApi from '../RestApi';
import './pages.css';

const Coffees = () => {

    const [receipeList, setReceipeList] = useState([]);

    useEffect(() => {
        setReceipeList([]);
        RestApi.getReceipe('coffees')
            .then(response => setReceipeList(response.data))
    }, []);

    return (
        <div className="card-list">
            {receipeList.map((receipeObj, index) => <Card key={index} receipeObj={receipeObj} />)}
        </div>
    )
}

export default Coffees;