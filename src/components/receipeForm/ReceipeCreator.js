import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import Spinner from "../../components/spinner/Spinner";
import RestApi from '../../RestApi';
import './style.css';

const ReceipeCreator = ({ id }) => {

    const [receipe, setReceipe] = useState({ title: '', type: '', description: '', url: '' });
    const [error, setError] = useState({ title: true, type: true, description: true, url: true });
    const [savingModal, setSavingModal] = useState(false);
    const [savingSuccessModal, setSavingSuccessModal] = useState(false);

    const saveReceipe = (e) => {
        e.preventDefault()
        setError(receipe);
        if (Object.values(receipe).every(value => value)) {
            setSavingModal(true);
            setError({ title: true, type: true, description: true, url: true });
            setReceipe({ title: '', description: '', url: '' });

            RestApi.saveReceipe({ ...receipe, userID: id }, receipe.type)
                .catch(error => alert(error))
                .finally(() => {
                    setSavingModal(false);
                    setSavingSuccessModal(true);
                    setTimeout(() => setSavingSuccessModal(false), 1000);
                });
        }
    }

    return (
        <div className='receipe-form-container'>
            <form>
                <label className='input-container'>
                    Title:
                    <input onChange={(e) => setReceipe(prevState => ({ ...prevState, title: e.target.value }))}
                        value={receipe.title} className="title-box" />
                    {error.title ? null : <div className='error-message'>Please enter a title</div>}
                </label>
                <label className='food-type-box'>
                    Food Type:
                </label>
                <div className='checkbox-container'>
                    <label>
                        <input onChange={(e) => setReceipe(prevState => ({ ...prevState, type: 'foods' }))}
                            name="type-of-food" type="radio" />
                        Food
                    </label>
                    <label>
                        <input onChange={(e) => setReceipe(prevState => ({ ...prevState, type: 'coffees' }))}
                            name="type-of-food" type="radio" />
                        Coffee
                    </label>
                    <label>
                        <input onChange={(e) => setReceipe(prevState => ({ ...prevState, type: 'snacks' }))}
                            name="type-of-food" type="radio" />
                        Snack
                    </label>
                    {error.type ? null : <div className='error-message'>Choose type</div>}
                </div>
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
                <button onClick={saveReceipe} className='save-button'>Save</button>
            </form>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={savingModal} center>
                <h2>Receipe saving...</h2>
                <Spinner />
            </Modal>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={savingSuccessModal} center>
                <h2>Success save</h2>
                <Spinner />
            </Modal>
        </div >
    )
}

export default ReceipeCreator;