import { register, login } from '../data.js';

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


    Object.keys(params).forEach(key => {
        if (params[key] === '') {
            alert('All inputs must not be empty!');
            return;
        }
    })

    if (params.password !== params.rePassword) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = 'Паролите не съвпадат!';
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 3000)
        return;
    }

    const data = {
        username: params.username,
        password: params.password
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

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 3000)
        return;
    } else {
        loadingBoxEl.style.display = 'none';
        successBoxEl.textContent = 'Successfully registered user!';
        successBoxEl.style.display = 'block';

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
        }, 3000)

        const result = await login(loginData);
        if (result.hasOwnProperty('errorData')) {
            loadingBoxEl.style.display = 'none';
            errorBoxEl.textContent = result.message;
            errorBoxEl.style.display = 'block';

            setTimeout(function () {
                errorBoxEl.textContent = '';
                errorBoxEl.style.display = 'none';
            }, 3000)
            return;
        }

        userData.loggedIn = true;
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', data.username);
        localStorage.setItem('pass', data.password);
        localStorage.setItem('user-token', result['user-token']);
        localStorage.setItem('ownerId', result.ownerId);

        this.redirect('#/');
    }
}