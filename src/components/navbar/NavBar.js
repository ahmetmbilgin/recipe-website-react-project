import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router-dom';
import RestApi from "../../RestApi";
import Spinner from "../spinner/Spinner";
import './style.css';

const NavBar2 = () => {
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState({ username: '', password: '' });
    const [userError, setUserError] = useState({ username: true, password: true });
    const [userConfirm, setUserConfirm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [correctUser, setCorrectUser] = useState('');

    const loader = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }

    useEffect(() => {
        setCorrectUser(localStorage.getItem("username"));
    }, [])

    const filtering = (username, password) => userList.filter(user => user.username === username && user.password === password).length > 0;
    const userSearch = (username, password) => {
        if (filtering(username, password)) {
            setCorrectUser(user.username)
            setUser({ username: '', password: '' });
            setUserConfirm(false);
            localStorage.setItem("username", username);
            loader();
            return true;
        } else {
            return false;
        }
    }

    const login = () => {
        setUserError(user);
        if (user.username && user.password) {
            userSearch(user.username, user.password) ? setUserConfirm(true) : setUserConfirm(false);
        }
    }

    return (
        <>
            <nav className='navbar'>
                <div>
                    <div className='icon-mark'>
                        Food<span>Receipe</span>.com
                    </div>
                    <div className='button-group'>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <span className='divider'></span>
                            <li><Link to="/foods">Foods</Link></li>
                            <li><Link to='coffees'>Coffees</Link></li>
                            <li><Link to='snacks'>Snacks</Link></li>
                            <span className='divider'></span>
                            {correctUser
                                ? <>
                                    <li className='success' title="My Account">
                                        <Link to={`/user/${localStorage.getItem("username")}`}>
                                            {localStorage.getItem("username")}
                                        </Link>
                                    </li>
                                    <li className='danger' title="Logout" onClick={(e) => {
                                        setCorrectUser('');
                                        localStorage.clear();
                                    }}>
                                        <Link to="/">
                                            Logout
                                        </Link>
                                    </li>
                                </>
                                : <>
                                    <li className='primary login popover' title="Login" onClick={() => {
                                        RestApi.getAllUsers()
                                            .then(response => setUserList(response.data))
                                            .catch(error => alert(error));
                                    }}>
                                        <Link >
                                            Login
                                        </Link>
                                        {/* Popover */}
                                        <form className="popover__content">
                                            <div className='input-container'>
                                                <input value={user.username} className='input' type="text" placeholder='username'
                                                    onChange={(e) => setUser(prevState => ({ ...prevState, username: e.target.value }))} />
                                                {!userError.username && <div>Please fill the blank</div>}
                                            </div>
                                            <div className='input-container'>
                                                <input value={user.password} className='input' type="password" placeholder='password'
                                                    onChange={(e) => setUser(prevState => ({ ...prevState, password: e.target.value }))} />
                                                {!userError.password && <div>Please fill the blank</div>}
                                            </div>
                                            <Link to={filtering(user.username, user.password) && '/'}>
                                                <button className='success enter-button' onClick={(e) => {
                                                    RestApi.getAllUsers()
                                                        .then(response => setUserList(response.data))
                                                        .catch(error => alert(error));
                                                    login();

                                                }}>Enter</button>
                                            </Link>
                                            {!userConfirm && <div>Wrong username or password!</div>}
                                        </form>
                                    </li>
                                    <li className='warning' title="Signup">
                                        <Link to="/signup">
                                            Signup
                                        </Link>
                                    </li>
                                </>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                <h2>Welcome, wait a second</h2>
                <Spinner />
            </Modal>
        </>
    )
}

export default observer(NavBar2);