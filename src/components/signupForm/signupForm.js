import { Button } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import RestApi from "../../RestApi";
import Spinner from "../spinner/Spinner";

const stil = {
    formContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        width: 300,
        height: 450,
        color: 'red',
        padding: 40,
        border: '2px solid grey',
        backgroundColor: '#fbb360',
        fontSize: 12,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '30px'

    },
    inputContainer: {
        height: 50
    }
}

const SignupForm = () => {

    const [newUser, setNewUser] = useState({ username: '', password: '', name: '', surname: '', email: '' });
    const [verifyPassword, setVeriyfyPassword] = useState('');
    const [signInError, setSignInError] = useState({ username: true, password: true, name: true, surname: true, email: true });
    const [usernameExis, setUsernameExis] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        RestApi.getAllUsers()
            .then(allUsers => {
                setUserList(allUsers.data);
            })
            .catch(error => alert(error));
    }, [])

    const usernameControl = (username) => {
        const userNames = userList.map(userObject => userObject.username);
        if (userNames.some(name => name === username)) {
            return false;
        } else {
            return true;
        }
    }

    const signup = (e) => {
        setSignInError(newUser);
        if (verifyPassword === newUser.password) {
            if (Object.values(newUser).every(value => value)) {
                if (usernameControl(newUser.username)) {
                    setUsernameExis(true);
                    setLoading(true);
                    RestApi.saveUser(newUser)
                        .then(() => {
                            setNewUser({ username: '', password: '', name: '', surname: '', email: '' });
                            setSignInError({ username: true, password: true, name: true, surname: true, email: true });
                            setVeriyfyPassword('');
                        })
                        .catch(error => alert(error))
                        .finally(() => {
                            setLoading(false);
                            setLoading2(true);
                            setTimeout(() => setLoading2(false), 1000);
                        });
                } else {
                    setUsernameExis(false);
                }
            }
        } else alert('Şifrenizi kontrol ediniz');
    }
    return (
        <>
            <div style={stil.formContainer} className="form-container">
                <form style={stil.form}>
                    <h2>Registration</h2>
                    <div style={stil.inputContainer}>
                        <input className="bp4-input bp4-fill" onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))} value={newUser.name} placeholder="Name" type="text" />
                        {signInError.name ? null : <div>Please fill the blank</div>}
                    </div>
                    <div style={stil.inputContainer}>
                        <input className="bp4-input bp4-fill" onChange={(e) => setNewUser(prev => ({ ...prev, surname: e.target.value }))} value={newUser.surname} placeholder="Surname" type="text" />
                        {signInError.surname ? null : <div>Please fill the blank</div>}
                    </div>
                    <div style={stil.inputContainer}>
                        <input className="bp4-input bp4-fill" onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))} value={newUser.email} placeholder="Email" type="text" />
                        {signInError.email ? null : <div>Please fill the blank</div>}
                    </div>
                    <div style={stil.inputContainer}>
                        <input className="bp4-input bp4-fill" onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))} value={newUser.username} placeholder="username" type="text" />
                        {usernameExis ? null : <div>This username already taken !</div>}
                        {signInError.username ? null : <div>Please fill the blank</div>}
                    </div>
                    <div style={stil.inputContainer}>
                        <input className="bp4-input bp4-fill" onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))} value={newUser.password} placeholder="password" type="password" />
                        {signInError.password ? null : <div>Please fill the blank</div>}
                    </div>
                    <div style={stil.inputContainer}>
                        <input className="bp4-input bp4-fill" onChange={(e) => setVeriyfyPassword(e.target.value)} value={verifyPassword} placeholder="verify password" type="password" />
                    </div>
                    <Button intent="success" className="bp4-button" onClick={(e) => {
                        e.preventDefault();
                        signup();
                    }}>Register</Button>
                </form>
            </div>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                <h2>Registration in progress...</h2>
                <Spinner />
            </Modal>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading2} center>
                <h2>Successful Registration</h2>
            </Modal>
        </>
    )
}

export default SignupForm;