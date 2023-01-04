import React, { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import RestApi from "../../RestApi";
import { Button, Label, Icon, Intent, Classes } from "@blueprintjs/core";
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
            .then(response => setUser(...response.data.filter(obj => obj.username === username)))
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
                            <Button style={{ textAlign: 'center' }} icon='duplicate' intent="success" className="bp4-icon-"
                                onClick={() => {
                                    setDashboard(false);
                                    setSettings(false);
                                    setReceipe(true);
                                }}>Create new recipe</Button>
                            <Button style={{ marginTop: 500 }} icon='cog' intent="warning" className="bp4-icon-"
                                onClick={() => {
                                    setDashboard(false);
                                    setSettings(true);
                                }}>Settings</Button>
                        </div>
                        <div className="content">
                            {dashboard ? <div>Dashboard</div> : null}
                            {receipe ? <input></input> : null}
                            {settings ? <div>
                                <Label>
                                    E-mail
                                    <input onChange={e => setUser(prevState => ({ ...prevState, email: e.target.value }))} className={Classes.INPUT} placeholder={user.email} />
                                </Label>
                                <Label>
                                    Password
                                    <input onChange={e => setUser(prevState => ({ ...prevState, password: e.target.value }))} className={Classes.INPUT} placeholder={user.password} />
                                </Label>
                                <Label>
                                    Name
                                    <input onChange={e => setUser(prevState => ({ ...prevState, name: e.target.value }))} className={Classes.INPUT} placeholder={user.name} />
                                </Label>
                                <Label>
                                    Surname
                                    <input onChange={e => setUser(prevState => ({ ...prevState, surname: e.target.value }))} className={Classes.INPUT} placeholder={user.surname} />
                                </Label>
                                <Button onClick={() => {
                                    loader();
                                    RestApi.changeUser(user, user.id);
                                }}>Save</Button>
                            </div> : null}
                        </div>
                    </div>
                    <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                        <h2>Veriler yükleniyor</h2>
                        <Spinner />
                    </Modal>
                </> : <h1>Buna yetkiniz bulunmamaktadır !</h1>}
        </>
    )
}

export default User;