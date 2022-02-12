import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../actions/authActionCreaters';
import * as helperFunctions from "./helperFuntions";

function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    return (
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <div className="input-container" data-error={nameError ? "Both first name and last name must be English and seperated by a space" : undefined}>
                    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-container" data-error={emailError ? "The email is not correct or you are already registered" : undefined}>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-container" data-error={passwordError ? "The password should include minimum 8 character, 1 uppercase letter, 1 lowercase letter, and 1 number" : undefined}>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={() => {
                    if (helperFunctions.validateName(name) && helperFunctions.validateEmail(email) && helperFunctions.validatePassword(password)) {
                        dispatch(actions.signUp(name, email, password));
                        // Now we need to check if the user is successfully regestered
                        if(auth) {
                            helperFunctions.deactivate();
                        } else {
                            setEmailError(true)
                            helperFunctions.resetInputs();
                        }
                    } else {
                        setNameError(!helperFunctions.validateName(name));
                        setEmailError(!helperFunctions.validateEmail(email));
                        setPasswordError(!helperFunctions.validatePassword(password));
                    }
                    helperFunctions.resetInputs();
                }}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm