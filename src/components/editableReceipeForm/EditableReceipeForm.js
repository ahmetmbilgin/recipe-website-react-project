import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import Spinner from "../../components/spinner/Spinner";
import RestApi from '../../RestApi';

const stil = {
    span: {
        color: 'red'
    }
}

const EditableReceipeForm = ({ receipeObj }) => {
    const [receipe, setReceipe] = useState({ title: receipeObj.title, description: receipeObj.description, type: receipeObj.type, url: receipeObj.url, userID: receipeObj.userID });
    const [error, setError] = useState({ title: true, type: true, description: true, url: true });
    const [savingModal, setSavingModal] = useState(false);
    const [deletingModal, setDeletingModal] = useState(false);
    const [receipeDeleteModal, setReceipeDeleteModal] = useState(false);
    const [formIsDel, setFormIsDel] = useState(false);

    const saveReceipe = (e) => {
        e.preventDefault();
        setError(receipe);
        if (Object.values(receipe).every(value => value)) {
            setSavingModal(true);
            setError({ title: true, type: true, description: true, url: true });
            RestApi.changeReceipe(receipeObj.type, receipeObj.id, receipe)
                .catch(error => alert(error))
                .finally(() => {
                    setSavingModal(false);
                });
        }
    }

    return (
        <>
            {formIsDel ? null :
                <div>
                    <div className='receipe-form-container '>
                        <form>
                            <label className='input-container'>
                                Title:
                                <input onChange={(e) => setReceipe(prevState => ({ ...prevState, title: e.target.value }))}
                                    value={receipe.title} className="title-box" />
                                {error.title ? null : <div className='error-message'>Please enter a title</div>}
                            </label>

                            <label className='description-container'>
                                Description:
                                <textarea onChange={(e) => setReceipe(prevState => ({ ...prevState, description: e.target.value }))}
                                    value={receipe.description} />
                                {error.description ? null : <div className='error-message'>Description can not be empyt </div>}
                            </label>
                            <label className='input-container'>
                                Picture url:
                                <input className='input-url' value={receipe.url} onChange={(e) => setReceipe(prevState => ({ ...prevState, url: e.target.value }))} />
                                {error.url ? null : <div className='error-message'>Enter an url</div>}
                            </label>
                            <button onClick={saveReceipe} className='save-button btn'>Save</button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setReceipeDeleteModal(true);
                            }} className="delete-button btn">Delete Receipe</button>
                            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={receipeDeleteModal} center>
                                <div className='modal-container'>
                                    <h2>Do you want to delete <span style={stil.span}>{receipeObj.title}</span></h2>
                                    <div className='button-group'>
                                        <button className="cancel-btn" onClick={() => {
                                            setReceipeDeleteModal(false);
                                            setDeletingModal(true);
                                            RestApi.deleteReceipe(receipe.type, receipeObj.id)
                                                .catch(error => alert(error))
                                            setTimeout(() => {
                                                setDeletingModal(false)
                                                setFormIsDel(true)
                                            }, 1000)
                                        }}>Delete</button>
                                        <button className="cancel-btn" onClick={() => setReceipeDeleteModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            </Modal>
                            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={savingModal} center>
                                <h2>Receipe saving...</h2>
                                <Spinner />
                            </Modal>
                            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={deletingModal} center>
                                <h2>Receipe deleting...</h2>
                                <Spinner />
                            </Modal>
                        </form>
                    </div >
                </div>
            }
        </>
    )
}

export default EditableReceipeForm;