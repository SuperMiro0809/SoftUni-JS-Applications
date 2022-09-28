import { register, login } from '../../scripts/data.js'

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
    }

    this.partial('../../templates/register.hbs', this.app.userData);
}

export async function registerUser() {
    const params = this.params;
    const userData = this.app.userData;
    const notificationEl = document.getElementById('notification');
    const registerButton = document.getElementById('registerIn');

    Object.keys(params).forEach(key => {
        if (params[key] === '') {
            alert('All inputs must not be empty!');
            return;
        }
    })

    if (params.password !== params.repeatPassword) {
        notificationEl.textContent = 'Паролите не съвпадат!';
        notificationEl.style.background = 'red';
        notificationEl.style.display = 'block';

        setTimeout(function () {
            notificationEl.textContent = '';
            notificationEl.style.background = '';
            notificationEl.style.display = 'none';
        }, 3000)
        return;
    }
    registerButton.textContent = 'Please wait...';
    const data = {
        email: params.email,
        password: params.password
    }
    const loginData = {
        login: params.email,
        password: params.password
    }

    const res = await register(data);
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
    const result = await login(loginData);
    if(result.hasOwnProperty('errorData')) {
        notificationEl.textContent = result.message;
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
    localStorage.setItem('email', data.email);
    localStorage.setItem('pass', data.password);
    localStorage.setItem('user-token', result['user-token']);
    localStorage.setItem('ownerId', result.ownerId);
    registerButton.textContent = 'Submit';
    this.redirect('#/');
}