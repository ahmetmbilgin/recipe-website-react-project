import './style.css'
import { Modal } from 'react-responsive-modal';
import RestApi from "../../RestApi";
import React, { useState } from "react";
import Spinner from '../spinner/Spinner';

const UserInfoForm = ({ user }) => {

    const [deletingModal, setDeletingModal] = useState(false);
    const [savingModal, setSavingModal] = useState(false);
    const [copyUser, setCopyUser] = useState(null);

    return (
        <div className="user-info-container">
            <label>
                E-mail
            </label>
            <input
                onChange={e => setCopyUser(prevState => ({ ...prevState, email: e.target.value }))}
                placeholder={user.email} />
            <label>
                Password
            </label>
            <input
                onChange={e => setCopyUser(prevState => ({ ...prevState, password: e.target.value }))}
                placeholder={user.password} />
            <label>
                Name
            </label>
            <input
                onChange={e => setCopyUser(prevState => ({ ...prevState, name: e.target.value }))}
                placeholder={user.name} />
            <label>
                Surname
            </label>
            <input
                onChange={e => setCopyUser(prevState => ({ ...prevState, surname: e.target.value }))}
                placeholder={user.surname} />
            <button className="save-btn" onClick={() => {
                if (Object.values(copyUser)) {
                    RestApi.changeUser({ ...user, ...copyUser }, user.id);
                    setSavingModal(true);
                    setTimeout(() => setSavingModal(false), 1000);
                    setCopyUser(null);
                }
            }}>Save</button>
            <button className="delete-account-btn" onClick={(e) => setDeletingModal(true)}>Delete Account</button>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={deletingModal} center>
                <div className='modal-container'>
                    <h2>Do you want to delete your account ?</h2>
                    <div className='button-group'>
                        <button className="delete-btn" onClick={() => {
                            RestApi.changeUser({}, user.id);
                            localStorage.clear();
                        }}>
                            <a href="/">Delete</a>
                        </button>
                        <button className="cancel-btn" onClick={() => setDeletingModal(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={savingModal} center>
                <h2>Saving changes...</h2>
                <Spinner />
            </Modal>
        </div>
    )
}

export default UserInfoForm;