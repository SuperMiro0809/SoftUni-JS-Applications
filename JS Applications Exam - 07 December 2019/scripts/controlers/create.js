import {createNewArticle} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    if(this.app.userData.loggedIn === false) {
        this.redirect('#/login');
    }

    this.partial('../../templates/create.hbs', this.app.userData);
}

export async function createTrek() {
    const treksData = this.app.treksData;
    const params = this.params;
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';
 
    
    if(params.location.length < 6) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = 'The trek name should be at least 6 characters long!';
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 3000)

        return;
    }

    if(params.description.length < 10) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = 'The description should be at least 10 characters long!';
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 3000)

        return;
    }

    const data = {
        organizer: localStorage.getItem('username'),
        likes: 0,
        description: params.description,
        location: params.location,
        trekDate: params.dateTime
    }

    const res = await createNewArticle(localStorage.getItem('user-token'), data);

    if(res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 3000)
        return;
    }else {
        loadingBoxEl.style.display = 'none';
        successBoxEl.textContent = 'Trek created successfully.';
        successBoxEl.style.display = 'block';

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/');
        }.bind(this), 3000)
    }
    console.log(res);
}