import * as helperFunctions from './helperFuntions';

function OverlayContainer() {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className="ghost" id="signIn" onClick={() => {
                        document.getElementById('container').classList.remove('right-panel-active');
                        helperFunctions.resetInputs();
                    }}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp" onClick={() => {
                        document.getElementById('container').classList.add('right-panel-active');
                        helperFunctions.resetInputs();
                    }}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default OverlayContainer;