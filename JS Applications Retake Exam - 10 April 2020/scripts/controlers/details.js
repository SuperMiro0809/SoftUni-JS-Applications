import {getPostById} from '../data.js'

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
    }
    const data = this.app.userData;
    if(data.loggedIn === true) {
        const id = this.params.id;
        const res = await getPostById(id);
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
        Object.assign(data, res);
    }else {
        alert('You are not logged in!');
        this.redirect('#/login');
    }
    this.partial('../../templates/details.hbs', data);
}