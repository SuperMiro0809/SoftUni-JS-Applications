import {getMovieById, updateMovie} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;

    if (this.app.userData.loggedIn === false) {
        this.redirect('#/login');
    }
    // const usernameObj = {};
    // if(data.loggedIn === true) {
    //     usernameObj.username = localStorage.getItem('username');
    //     Object.assign(data, usernameObj)
    // }

    const id = this.params.id;
    const event = await getMovieById(id);

    // if(trek.ownerId === localStorage.getItem('ownerId')) {
    //     data.isOwner = true;
    // }

    Object.assign(data, event);
    this.partial('../../templates/edit.hbs', data);
}


export async function editMovie() {
    const params = this.params;
    const id = this.params.id;
    const notifications = document.getElementsByClassName('notifications');
    const successBoxEl = notifications[1];
    const errorBoxEl = notifications[0];

    try {
        if (params.title.length === 0) {
            throw new Error('The title shouldn\'t be empty!')
        }else if(params.description.length === 0) {
            throw new Error('The description shouldn\'t be empty!');
        }else if(params.imageUrl.length === 0) {
            throw new Error('The image url shouldn\'t be empty!');
        }else if (params.imageUrl.slice(0, 7) !== 'http://' && params.imageUrl.slice(0, 8) !== 'https://') {
            throw new Error('Image url is not valid!');
        }
    } catch (err) {
        errorBoxEl.textContent = err.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    }

    const data = {
        title: params.title,
        description: params.description,
        image: params.imageUrl
    }

    const res = await updateMovie(id, data);

    if (res.hasOwnProperty('errorData')) {
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    }

    successBoxEl.textContent = 'Eddited successfully';
    successBoxEl.style.display = 'block';

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this), 1000);

    // successBoxEl.addEventListener('click', function () {
    //     successBoxEl.textContent = '';
    //     successBoxEl.style.display = 'none';
    //     this.redirect('#/details/${id}');
    // }.bind(this))
}