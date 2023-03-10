import React, { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useParams } from "react-router-dom";
import EditableReceipeForm from "../../components/editableReceipeForm/EditableReceipeForm";
import ReceipeCreator from "../../components/receipeForm/ReceipeCreator";
import Spinner from "../../components/spinner/Spinner";
import UserInfoForm from "../../components/userInfoForm/userInfoForm";
import RestApi from "../../RestApi";
import './style.css';

const User = () => {
    const { username } = useParams();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState(false);
    const [dashboard, setDashboard] = useState(true);
    const [createReceipe, setCreateReceipe] = useState(false);
    const [user, setUser] = useState(null);
    const [receipeList, setReceipeList] = useState([]);

    const getUserReceipes = value => {
        setReceipeList([]);
        RestApi.getReceipe('foods')
            .then(response => response.data.forEach(object => object.userID === value.id && setReceipeList(prevState => [...prevState, object])))
            .catch(error => alert(error));

        RestApi.getReceipe('drinks')
            .then(response => response.data.forEach(object => object.userID === value.id && setReceipeList(prevState => [...prevState, object])))
            .catch(error => alert(error));

        RestApi.getReceipe('snacks')
            .then(response => response.data.forEach(object => object.userID === value.id && setReceipeList(prevState => [...prevState, object])))
            .catch(error => alert(error));
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
        RestApi.getAllUsers()
            .then(response => {
                let filteredUser = response.data.filter(obj => obj.username === localStorage.getItem("username"))[0];
                setUser(filteredUser);
                getUserReceipes(filteredUser);
            })
            .catch(error => alert(error))
    }, [])



    return (
        <>
            {localStorage.getItem("username") === username
                ? <div className="account-page">
                    <div className="side-menu">
                        <button onClick={() => {
                            getUserReceipes(user);
                            setSettings(false);
                            setCreateReceipe(false);
                            setDashboard(true);
                        }}>Dashboard</button>
                        <button onClick={() => {
                            setDashboard(false);
                            setSettings(false);
                            setCreateReceipe(true);
                        }}>Create new recipe</button>
                        <button onClick={() => {
                            RestApi.getUser(user.id)
                                .then(response => setUser(response.data))
                                .catch(error => alert(error));
                            setDashboard(false);
                            setCreateReceipe(false);
                            setSettings(true);
                        }}>Settings</button>
                    </div>
                    <div className="content">
                        {dashboard ? null : createReceipe ? null : settings ? null : <div className="welcome">Welcome <span className="username-span">{username}</span></div>}
                        {dashboard
                            ? ((receipeList.length > 0)
                                ? receipeList.map((receipeObj, index) => <EditableReceipeForm key={index} receipeObj={receipeObj} />)
                                : <h3>You do not have a saved recipe yet...</h3>)
                            : null}
                        {createReceipe ? <ReceipeCreator id={user.id} /> : null}
                        {settings ? <UserInfoForm user={user} /> : null}
                    </div>
                    <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                        <h2>Data is loading...</h2>
                        <Spinner />
                    </Modal>
                </div>
                : <h1>
                    You are not authorized !
                </h1>}
        </>
    )
}

export default User;