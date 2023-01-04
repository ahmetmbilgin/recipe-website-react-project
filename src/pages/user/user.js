import { Button, Label } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useParams } from "react-router-dom";
import ReceipeCreator from "../../components/receipeForm/ReceipeCreator";
import Spinner from "../../components/spinner/Spinner";
import RestApi from "../../RestApi";
import './style.css';

const User = () => {

    const { username } = useParams();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [receipe, setReceipe] = useState(false);
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
                            <div className="heading">{username}</div>
                            <Button icon='control' onClick={() => {
                                setSettings(false);
                                setReceipe(false);
                                setDashboard(true);
                            }}>Dashboard</Button>
                            <Button icon='duplicate' intent="success" className="bp4-icon-"
                                onClick={() => {
                                    setDashboard(false);
                                    setSettings(false);
                                    setReceipe(true);
                                }}>Create new recipe</Button>
                            <Button icon='cog' intent="warning" className="bp4-icon- settings-button"
                                onClick={() => {
                                    setDashboard(false);
                                    setReceipe(false);
                                    setSettings(true);
                                }}>Settings</Button>
                        </div>
                        <div className="content">
                            {dashboard ? <div>Dashboard</div> : null}
                            {receipe ? <ReceipeCreator id={user.id} /> : null}
                            {settings ? <div>
                                <Label>
                                    E-mail
                                    <input
                                        onChange={e => setUser(prevState => ({ ...prevState, email: e.target.value }))}
                                        className="bp4-input bp4-fill" placeholder={user.email} />
                                </Label>
                                <Label>
                                    Password
                                    <input
                                        onChange={e => setUser(prevState => ({ ...prevState, password: e.target.value }))}
                                        className="bp4-input bp4-fill" placeholder={user.password} />
                                </Label>
                                <Label>
                                    Name
                                    <input
                                        onChange={e => setUser(prevState => ({ ...prevState, name: e.target.value }))}
                                        className="bp4-input bp4-fill" placeholder={user.name} />
                                </Label>
                                <Label>
                                    Surname
                                    <input
                                        onChange={e => setUser(prevState => ({ ...prevState, surname: e.target.value }))}
                                        className="bp4-input bp4-fill" placeholder={user.surname} />
                                </Label>
                                <Button intent="danger" onClick={() => {
                                    loader();
                                    RestApi.changeUser(user, user.id);
                                }}>Save</Button>
                            </div> : null}
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