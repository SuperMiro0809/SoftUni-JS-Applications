import {login} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    this.partial('../../templates/login.hbs', this.app.userData);
}

export async function loginUser() {
    const params = this.params;
    const userData = this.app.userData;
    const notifications = document.getElementsByClassName('notifications');
    const successBoxEl = notifications[1];
    const errorBoxEl = notifications[0];

    try {
        if (params.email === '') {
            throw new Error('Email must not be empty!');
        } else if (params.password === '') {
            throw new Error('Password must not be empty!')
        }

    } catch (err) {
        errorBoxEl.textContent = err.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        },1000)
        return;
    }

    const data = {
        login: params.email,
        password: params.password
    }
    const res = await login(data);

    if (res.hasOwnProperty('errorData')) {
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        },1000)
        return;
    } else {
        successBoxEl.textContent = 'Login successful.';
        successBoxEl.style.display = 'block';

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/home');
        }.bind(this), 1000);

        // successBoxEl.addEventListener('click', function () {
        //     successBoxEl.textContent = '';
        //     successBoxEl.style.display = 'none';
        //     this.redirect('#/home');
        // }.bind(this))

        userData.loggedIn = true;
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('email', data.login);
        localStorage.setItem('user-token', res['user-token']);
        localStorage.setItem('ownerId', res.ownerId);

    }

}