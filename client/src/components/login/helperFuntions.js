export function deactivate() {
    document.getElementById('overley').classList.remove('activated');
    document.getElementById('popup').classList.remove('activated');
    
    // Now we should remove all the errors
    document.querySelectorAll(".input-container").forEach(container => container.removeAttribute('data-error'));

    // Reset the whole popup to return in the Sign in State
    document.getElementById('container').classList.remove('right-panel-active');
}

export function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

export function validateName(name) {
    const re = /^[a-z ,.'-]+\s[a-z ,.'-]+$/i;
    return re.test(name);
}

export function validatePassword(password) {
    // varify that the password is at least 8 characters, there is at least one uppercase, lowercase letter, and number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}

export function resetInputs() {
    document.querySelectorAll('.input-container input').forEach(input => input.value = "");
}