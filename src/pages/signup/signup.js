import 'react-responsive-modal/styles.css';
import SignupForm from "../../components/signupForm/signupForm";
import Fruits from '../../images/fruits.jpg';
import './style.css';

const stil = {
    signupContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: '0px 300px',
        marginTop: '50px',
    },
    img: {
        backgroundRepeat: 'no-repeat',
        width: '500px',
        borderRadius: '30px'
    }
}

const Signup = () => {
    return (<>
        {
            localStorage.getItem("username") ?
                <h2>Lütfen önce çıkış yapınız...</h2>
                : <div style={stil.signupContainer} className='signup-container'>
                    <SignupForm />
                    <img src={Fruits} alt='fruits'></img>
                </div>
        }
    </>)
}

export default Signup;