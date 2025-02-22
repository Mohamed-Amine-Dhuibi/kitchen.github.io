class Validator {
    constructor(username, email = '', password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    validateUsername() {
        const username = this.username.trim();
        return username !== '' && !username.includes(' ');
    }
        
    validateEmail() {
        if (this.email === '') return true; 
        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(this.email);
    }

    validatePassword() {
        return this.password.length >= 8;
    }

    validateSignUpForm() {
        return this.validateUsername() && this.validateEmail() && this.validatePassword();
    }

    validateSignInForm() {
        return this.validateUsername() && this.validatePassword();
    }

    isUsernameUnique() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return !users.some(user => user.username === this.username);
    }

    saveUserToStorage() {
        if (!this.isUsernameUnique()) {
            console.log('Username already exists. Choose a different one.');
            return false;
        }

        const user = {
            username: this.username,
            email: this.email,
            password: this.password
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));

        console.log('User saved to localStorage:', user);
        return true;
    }
    login() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === this.username && user.password === this.password);
    
        if (user) {
            console.log('Login successful!');
            return true;
        } else {
            console.log('Invalid username or password.');
            return false;
        }
    }
}

document.getElementById('signInForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    const validator = new Validator(username, '', password);

    const usernameError = document.getElementById('signInUsername-error');
    const passwordError = document.getElementById('signInPassword-error');
    const valid = validator.login();

    if (!valid) {
        usernameError.className = "msg-error";
        passwordError.className = "msg-error";
        usernameError.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
        passwordError.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
    
        document.getElementById('signInUsername').classList.remove('valid');
        document.getElementById('signInUsername').classList.add('error');
    
        document.getElementById('signInPassword').classList.remove('valid');
        document.getElementById('signInPassword').classList.add('error');
    } else {
        usernameError.textContent = "";
        passwordError.textContent = "";
        
        document.getElementById('signInUsername').classList.add('valid');
        document.getElementById('signInUsername').classList.remove('error');
        
        document.getElementById('signInPassword').classList.add('valid');
        document.getElementById('signInPassword').classList.remove('error');
        
        usernameError.classList.remove('msg-error');
        passwordError.classList.remove('msg-error');
        
        alert("Login success !");
    }
});



document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    const validator = new Validator(username, email, password);

    const usernameError = document.getElementById('signupUsername-error');
    const passwordError = document.getElementById('signupPassword-error');
    const emailError = document.getElementById('signupEmail-error');

    let valid = true;

    if (!validator.validateUsername()) {
        valid = false;
        usernameError.className ="msg-error";
        usernameError.textContent = "Username is in wrong format.";
        document.getElementById('signupUsername').classList.remove('valid');
        document.getElementById('signupUsername').classList.add('error');
    } else {
        usernameError.textContent = "";
        document.getElementById('signupUsername').classList.add('valid');
        document.getElementById('signupUsername').classList.remove('error');
        usernameError.classList.remove('msg-error');

    }

    if(!validator.validateEmail()){
        valid = false;
        emailError.className ="msg-error";
        emailError.textContent = "Wrong email format.";
        document.getElementById('signupEmail').classList.remove('valid');
        document.getElementById('signupEmail').classList.add('error');

    } else {
        emailError.textContent = "";
        document.getElementById('signupEmail').classList.add('valid');
        document.getElementById('signupEmail').classList.remove('error');
        emailError.classList.remove('msg-error');

    }

    if (!validator.validatePassword()) {
        valid = false;
        passwordError.className = "msg-error";
        passwordError.textContent = "Le mot de passe doit contenir au moins 8 caractères,une majuscule,\n une minuscule,\n un chiffre et un caractère spécial.";
        document.getElementById('signupPassword').classList.remove('valid');
        document.getElementById('signupPassword').classList.add('error');
    } else {
        passwordError.textContent = "";
        document.getElementById('signupPassword').classList.add('valid');
        document.getElementById('signupPassword').classList.remove('error');
        passwordError.classList.remove('msg-error');
    }

    if (validator.validateSignUpForm()) {
        if (validator.saveUserToStorage()) {
            alert("User saved !");
            passwordError.classList.remove('msg-error');
            usernameError.classList.remove('msg-error');
            emailError.classList.remove('msg-error');    
            console.log('User added successfully.');
        } else {
            alert("user is alreday signed up !");
        }
    } else {
        console.log('Form validation failed.');
    }
});



