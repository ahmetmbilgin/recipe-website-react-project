import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import RestApi from '../RestApi';
import './pages.css';

const Foods = () => {

    const [receipeList, setReceipeList] = useState([]);
    const [filteredReceipeList, setFilteredReceipeList] = useState([]);

    const searchFood = (value) => {
        setFilteredReceipeList(receipeList.filter(receipeObj => receipeObj.title.toLowerCase().trim().startsWith(value.toLowerCase().trim())))
    }

    useEffect(() => {
        RestApi.getReceipe('snacks')
            .then(response => setReceipeList(response.data))
            .catch(error => alert(error));
    }, []);

    return (
        <div className="container">
            <input className="search-input" placeholder="Search..." type="text" onChange={(e) => searchFood(e.target.value)} />
            <div className="card-list">
                {filteredReceipeList.length > 0
                    ? <>{filteredReceipeList.map((receipeObj, index) => <Card key={index} receipeObj={receipeObj} />)}</>
                    : <>{receipeList.map((receipeObj, index) => <Card key={index} receipeObj={receipeObj} />)} </>}
            </div>
        </div>
    )
}

export default Foods;