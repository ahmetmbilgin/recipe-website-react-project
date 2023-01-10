import './style.scss';

const Card = ({ }) => {

    return (
        <div className='card-container'>
            <figure class="image-block">
                <h1>The Beach Tavada Sosis</h1>
                <img src={''} alt="receipe picture" />
                <figcaption>
                    <div>
                        <h3>
                            More Info
                        </h3>
                        <p>{ }</p>
                    </div>
                    <h4>Writer : <span>{ }</span></h4>
                </figcaption>
            </figure>
        </div>
    )
}

export default Card;