import {register, login} from '../data.js';

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
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    try {
        if(params.firstName.length < 2) {
            throw new Error('The first name should be at least 2 characters long');
        }else if(params.lastName.length < 2) {
            throw new Error('The last name should be at least 2 characters long')
        }else if(params.username.length < 3) {
            throw new Error('The username should be at least 3 characters long');
        }else if(params.password.length < 6) {
            throw new Error('The password should be at least 6 characters long');
        }

        if(params.password !== params.repeatPassword) {
            throw new Error('Passwords don\'t match!');
        }

    }catch(err) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = err.message;
        errorBoxEl.style.display = 'block';

        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    }

    const data = {
        username: params.username,
        password: params.password,
        firstName: params.firstName,
        lastName: params.lastName
    }
    const loginData = {
        login: params.username,
        password: params.password
    }
    const res = await register(data);
    if (res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    } else {
        loadingBoxEl.style.display = 'none';
        successBoxEl.textContent = 'User registration successful.';
        successBoxEl.style.display = 'block';

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
        }, 5000)

        successBoxEl.addEventListener('click', function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
        })

        const result = await login(loginData);
        if (result.hasOwnProperty('errorData')) {
            loadingBoxEl.style.display = 'none';
            errorBoxEl.textContent = result.message;
            errorBoxEl.style.display = 'block';

            errorBoxEl.addEventListener('click', function () {
                errorBoxEl.textContent = '';
                errorBoxEl.style.display = 'none';
            })
            return;
        }

        userData.loggedIn = true;
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('pass', data.password);
        sessionStorage.setItem('user-token', result['user-token']);
        sessionStorage.setItem('ownerId', result.ownerId);
        sessionStorage.setItem('events', res.events || '');
        sessionStorage.setItem('names', `${params.firstName} ${params.lastName}`);

        this.redirect('#/home');
    }


    // this.redirect('#/home');
}