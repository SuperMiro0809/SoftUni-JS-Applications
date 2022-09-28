import {login} from '../data.js'

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
    }

    this.partial('../../templates/login.hbs', this.app.userData);
}

export async function loginUser() {
    const params = this.params;
    const userData = this.app.userData;
    const loginButton = document.getElementById('loginIn');
    loginButton.textContent = 'Please wait...';

    Object.keys(params).forEach(key => {
        if(params[key] === '') {
            alert('All inputs must not be empty!');
            return;
        }
    })

    const data = {
        login: params.email,
        password: params.password
    }
    const res = await login(data);

    if(res.hasOwnProperty('errorData')) {
        notificationEl.textContent = res.message;
        notificationEl.style.background = 'red';
        notificationEl.style.display = 'block';
        registerButton.textContent = 'Submit';
        setTimeout(function () {
            notificationEl.textContent = '';
            notificationEl.style.background = '';
            notificationEl.style.display = 'none';
        }, 3000)
        return;
    }

    userData.loggedIn = true;
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('email', data.login);
    localStorage.setItem('pass', data.password);
    localStorage.setItem('user-token', res['user-token']);
    localStorage.setItem('ownerId', res.ownerId);

    loginButton.textContent = 'Submit';
    this.redirect('#/');
}