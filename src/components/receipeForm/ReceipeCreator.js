import { Button, Card, EditableText, Elevation, Label } from "@blueprintjs/core";
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import Spinner from "../../components/spinner/Spinner";
import RestApi from '../../RestApi';
import './style.css';

const ReceipeCreator = ({ id }) => {

    const [receipe, setReceipe] = useState({ title: '', type: '', description: '', url: '' });
    const [error, setError] = useState({ title: true, type: true, description: true, url: true });
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const saveReceipe = () => {
        setError(receipe);
        if (Object.values(receipe).every(value => value)) {
            setLoading(true);
            setError({ title: true, type: true, description: true, url: true });
            setReceipe({ title: '', description: '', url: '' });
            RestApi.saveReceipe({ ...receipe, userID: id }, receipe.type)
                .catch(error => alert(error))
                .finally(() => {
                    setLoading(false);
                    setLoading2(true);
                    setTimeout(() => setLoading2(false), 1000);
                });
        }
    }

    return (
        <>
            <Card elevation={Elevation.FOUR} className='receipe-form-container'>
                <form>
                    <Label className='bp4-inline input-container'>
                        Title:
                        <div>
                            <input onChange={(e) => setReceipe(prevState => ({ ...prevState, title: e.target.value }))}
                                value={receipe.title} className="bp4-input title-box" />
                            {error.title ? null : <div className='error-message'>Please enter a title</div>}
                        </div>
                    </Label>
                    <Label className='bp4-inline food-type-box'>
                        Food Type:
                    </Label>
                    <div className='checkbox-container'>
                        <label>
                            <input onChange={(e) => setReceipe(prevState => ({ ...prevState, type: 'foods' }))}
                                name="type-of-food" type="radio" />
                            Food</label>

                        <label>
                            <input onChange={(e) => setReceipe(prevState => ({ ...prevState, type: 'coffees' }))}
                                name="type-of-food" type="radio" />
                            Coffee</label>

                        <label>
                            <input onChange={(e) => setReceipe(prevState => ({ ...prevState, type: 'snacks' }))}
                                name="type-of-food" type="radio" />
                            Snack</label>
                        {error.type ? null : <div className='error-message'>Choose type</div>}
                    </div>
                    <div className='description-container' >
                        <EditableText onChange={(e) => setReceipe(prevState => ({ ...prevState, description: e }))}
                            value={receipe.description} maxLength={1000} intent='primary' multiline={true} minLines={14} maxLines={14} placeholder='Description: maximum 1000 character...' />
                        {error.description ? null : <div className='error-message'>Description can not be empyt </div>}
                    </div>
                    <Label className='bp4-inline input-container'>
                        Picture url:
                        <input value={receipe.url} onChange={(e) => setReceipe(prevState => ({ ...prevState, url: e.target.value }))} className="bp4-input bp4-fill " />
                        {error.url ? null : <div className='error-message'>Enter an url</div>}
                    </Label>
                    <Button onClick={() => saveReceipe()}
                        className='save-button' intent='success'>Save</Button>
                </form>
            </Card>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                <h2>Receipe saving...</h2>
                <Spinner />
            </Modal>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading2} center>
                <h2>Success save</h2>
                <Spinner />
            </Modal>
        </>
    )
}

export default ReceipeCreator;