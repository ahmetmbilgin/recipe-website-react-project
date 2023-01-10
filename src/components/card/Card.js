import { useEffect, useState } from 'react';
import RestApi from '../../RestApi';
import './style.scss';

const Card = ({ receipeObj }) => {

    const [writer, setWriter] = useState('');
    const [deletedUser, setDeletedUser] = useState('');

    useEffect(() => {
        RestApi.getUser(receipeObj.userID)
            .then(response => {
                response.data.username ? setWriter(response.data.username.toUpperCase()) : setDeletedUser('deleted user');
            })
            .catch(error => alert(error));
    });

    return (
        <div className='card-container'>
            <figure className="image-block">
                <h1>{receipeObj.title}</h1>
                <img src={receipeObj.url} alt="receipe_picture" />
                <figcaption>
                    <div>
                        <h3>
                            More Info
                        </h3>
                        <p>{receipeObj.description}</p>
                    </div>
                    <h4>
                        Writer : {writer ? <span>{writer}</span> : <span className='deleted-user-span'>{deletedUser}</span>}
                    </h4>
                </figcaption>
            </figure>
        </div>
    )
}

export default Card;