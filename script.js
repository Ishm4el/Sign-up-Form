const firstName = document.querySelector("#first-name");
const lastName = document.querySelector('#last-name');

const email = document.querySelector("#email");
const emailInvalid = document.querySelector('#invalid-email');
const phoneNumber = document.querySelector("#phone-number");

const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

// name listeners
firstName.addEventListener('focusout', () => {
    if (firstName.value.trim() === '') {
        firstName.classList.add('invalid-input');
    }
    else {
        firstName.classList.remove('invalid-input');
    }
});

firstName.addEventListener('focusin', () => {
    if (firstName.classList.contains('invalid-input')) {
        firstName.classList.remove('invalid-input');
    }
});

lastName.addEventListener('focusout', () => {
    if (lastName.value.trim() === '') {
        lastName.classList.add('invalid-input');
    }
    else {
        lastName.classList.remove('invalid-input');
    }
});

lastName.addEventListener('focusin', () => {
    if (lastName.classList.contains('invalid-input')) {
        lastName.classList.remove('invalid-input');
    }
});


// phone listeners
phoneNumber.addEventListener('focusout', () => {
    if (phoneNumber.checkValidity() === false || phoneNumber.value.trim() === '') {
        phoneNumber.classList.add('invalid-input');
    }
});

phoneNumber.addEventListener('focusin', () => {
    if (phoneNumber.classList.contains('invalid-input')) {
        phoneNumber.classList.remove('invalid-input');
    }
});


// email listeners
email.addEventListener('focusout', () => {
    if (email.value.trim() !== '') {
        if (email.checkValidity() === false) {
            email.classList.add('invalid-input');
            emailInvalid.textContent = 'Invalid email!';
        }
    }
    else {
        email.classList.add('invalid-input');
    }
});

email.addEventListener('focusin', () => {
    if (email.classList.contains('invalid-input')) {
        email.classList.remove('invalid-input');
    }
    emailInvalid.textContent = '';
});


// Password listeners
password.addEventListener('focusin', () => {
    if (/\d/.test(password.value) && /[a-zA-Z]/.test(password.value) && password.value.trim().length >= 8) {
        password.classList.remove('invalid-input');
    }
    else {
        if (password.value.trim() !== '') {
            password.classList.add('invalid-input');
        }

    }
}); 

password.addEventListener('focusin', () => {
    if (password.classList.contains('invalid-input')) {
        password.classList.remove('invalid-input');
    }
});

password.addEventListener('input', () => {
    const validatePassword = document.querySelectorAll("div.valid-text > span");
    let validated = checkPasswordValidity(password.value);

    if (validated.len) {
        validatePassword[0].classList.add('check-pass');
        validatePassword[0].innerHTML = 'V';
    }
    else {
        validatePassword[0].classList.remove('check-pass');
        validatePassword[0].innerHTML = 'X';
    }
    
    if (validated.num) {
        validatePassword[1].classList.add('check-pass');
        validatePassword[1].innerHTML = 'V';
    }
    else {
        validatePassword[1].classList.remove('check-pass');
        validatePassword[1].innerHTML = 'X';
    }
    
    if (validated.let) {
        validatePassword[2].classList.add('check-pass');
        validatePassword[2].innerHTML = 'V';
    }
    else {
        validatePassword[2].classList.remove('check-pass');
        validatePassword[2].innerHTML = 'X';
    }
});


// confirmPassword listeners
const invalidConfirmPasswordText = document.querySelector('p.confirm-password-invalid');
confirmPassword.addEventListener('focusout', () => {
    if (confirmPassword.value.trim() !== '') {
        if (confirmPassword.value !== password.value) {
            confirmPassword.classList.add('invalid-input');
            invalidConfirmPasswordText.textContent = 'Password does not match!';
        }
    }
});
confirmPassword.addEventListener('focusin', () => {
    if (confirmPassword.classList.contains('invalid-input')) {
        confirmPassword.classList.remove('invalid-input');
        invalidConfirmPasswordText.textContent = '';
    }
});


// create form listeners
const signUpForm = document.querySelector('form');
const submitButton = document.querySelector('button');
submitButton.addEventListener('click', () => {
    const validated = checkPasswordValidity();
    if (email.checkValidity() === true && password.value.trim() !== '' && 
        confirmPassword.value === password.value && 
        validated.len && validated.num && validated.let) {
            // signUpForm.submit();
            console.log(signUpForm.checkValidity());
            console.log("valid");
        }
});

function checkPasswordValidity() {
    const validated = {
        len : false,
        num : false,
        let : false
    };

    if (password.value.trim().length >= 8) {
        validated.len = true;
    }
    if (/\d/.test(password.value)) {
        validated.num = true;
    }
    if (/[a-zA-Z]/.test(password.value)) {
        validated.let = true;
    }

    return validated;
}