import './NavBar.css';
import { useDispatch, useSelector } from "react-redux";
import 'flag-icon-css/css/flag-icon.min.css';
import LangDropdown from './LangDropdown';
import Login from '../login/Login';
import { logOut } from '../../actions/authActionCreaters';

function activate() {
    document.getElementById('overley').classList.toggle('activated');
    document.getElementById('popup').classList.toggle('activated');
}

/**
 * This function will render the content based on the authentication state
 */

function renderContent(auth, dispatch) {
    switch (auth) {
        case null:
            return <button>Loading...</button>; // wait until the fetch user action finish
        case false:
            return <button onClick={activate}>Log In</button>;
        default:
            return <button onClick={() => {
                dispatch(logOut());
            }}>Log out</button>;
    }
}

function NavBar() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (
        <div className="nav-bar-container">
            <i className="fas fa-shopping-cart nav-logo"></i>
            <input className="search" type="text" placeholder="What are you looking for?" />
            {renderContent(auth, dispatch)}
            <LangDropdown />
            <Login />
        </div>
    );
}

// this will allow us to use the auth reducer as a prop in our component
function mapStateToProps(state) {
    return { auth: state.auth };
}

export default NavBar;