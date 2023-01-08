import React, { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useParams } from "react-router-dom";
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



    const loader = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }

    useEffect(() => {
        loader();
        RestApi.getAllUsers()
            .then(response => setUser(...response.data.filter(obj => obj.username === localStorage.getItem("username"))))
            .catch(error => alert(error));
    }, [])

    return (
        <>
            {localStorage.getItem("username") === username
                ? <>
                    <div className="account-page">
                        <div className="side-menu">
                            <div className="username">{username}</div>
                            <button onClick={() => {
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
                            {dashboard ? <div>Dashboard</div> : null}
                            {createReceipe ? <ReceipeCreator id={user.id} /> : null}
                            {settings ? <UserInfoForm user={user} /> : null}
                        </div>
                    </div>
                    <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                        <h2>Data is loading...</h2>
                        <Spinner />
                    </Modal>
                </> : <h1>You are not authorized !</h1>}
        </>
    )
}

export default User;