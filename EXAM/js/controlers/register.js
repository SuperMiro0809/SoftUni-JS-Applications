import {login, register} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    this.partial('../../templates/register.hbs', this.app.userData);
}

export async function registerUser() {
    const params = this.params;
    const userData = this.app.userData;
    const notifications = document.getElementsByClassName('notifications');
    const successBoxEl = notifications[1];
    const errorBoxEl = notifications[0];

    try {
        if(params.email.length === 0) {
            throw new Error('The email input must be filled');
        }else if(params.password.length < 6) {
            throw new Error('The password should be at least 6 characters long');
        }

        if(params.password !== params.repeatPassword) {
            throw new Error('Passwords don\'t match!');
        }

    }catch(err) {
        errorBoxEl.textContent = err.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        },1000)
        return;
    }

    const data = {
        email: params.email,
        password: params.password,
    }
    const loginData = {
        login: params.email,
        password: params.password
    }
    const res = await register(data);
    if (res.hasOwnProperty('errorData')) {
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        // errorBoxEl.addEventListener('click', function () {
        //     errorBoxEl.textContent = '';
        //     errorBoxEl.style.display = 'none';
        // })

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        },1000)
        return;
    } else {
        const result = await login(loginData);
        if (result.hasOwnProperty('errorData')) {
            errorBoxEl.textContent = result.message;
            errorBoxEl.style.display = 'block';

            setTimeout(function () {
                errorBoxEl.textContent = '';
                errorBoxEl.style.display = 'none';
            },1000)
            return;
        }

        userData.loggedIn = true;
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('email', data.email);
        localStorage.setItem('user-token', result['user-token']);
        localStorage.setItem('ownerId', result.ownerId);

        successBoxEl.textContent = 'Successful registration!';
        successBoxEl.style.display = 'block';

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/home');
        }.bind(this), 1000)

        // successBoxEl.addEventListener('click', function () {
        //     successBoxEl.textContent = '';
        //     successBoxEl.style.display = 'none';
        //     this.redirect('#/home');
        // }.bind(this))
    }


    // this.redirect('#/home');
}