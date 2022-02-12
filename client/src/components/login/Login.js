import './Login.css';
import OverlayContainer from './OverlayContainer';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import * as helperFunctions from './helperFuntions';

function Login() {

    // Thie following commands will be ran before the component rendered

    // Add listener to escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === "Esc") {
            helperFunctions.deactivate();
        }
    }, false);

    return (
        <div id="overley">
            <div id="popup">
                <div className="container" id="container">
                    <button onClick={helperFunctions.deactivate} id="closeButton">&times;</button>
                    <SignUpForm />
                    <SignInForm />
                    <OverlayContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;