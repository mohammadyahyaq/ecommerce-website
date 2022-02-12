import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from '../../actions/authActionCreaters';
import * as helperFunctions from './helperFuntions';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    return (
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <div className="input-container" data-error={emailError ? "The email is not correct or you are not currently registered" : undefined}>
                    <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="input-container" data-error={passwordError ? "The password should include minimum 8 character, 1 uppercase letter, 1 lowercase letter, and 1 number" : undefined}>
                    <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <Link className="forgetPass" to="#">Forgot your password?</Link>
                <button onClick={() => {
                    // we need to validate all the inputs
                    if (helperFunctions.validateEmail(email) && helperFunctions.validatePassword(password)) {
                        dispatch(actions.loginUser(email, password));
                        // we need to check if the user is now entered the authentication state or not
                        if(auth) {
                            helperFunctions.deactivate();
                        } else {
                            setEmailError(true);
                            helperFunctions.resetInputs();
                        }
                    } else {
                        // here we we show the errors
                        setEmailError(!helperFunctions.validateEmail(email));
                        setPasswordError(!helperFunctions.validatePassword(password));
                    }
                    helperFunctions.resetInputs();
                }}>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;