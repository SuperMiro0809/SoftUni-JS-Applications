import {getPostById, updatePost} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs'),
        treks: await this.load('../../templates/trek.hbs')
    }

    const data = this.app.userData;

    if(this.app.userData.loggedIn === false) {
        this.redirect('#/login');
    }
    // const usernameObj = {};
    // if(data.loggedIn === true) {
    //     usernameObj.username = localStorage.getItem('username');
    //     Object.assign(data, usernameObj)
    // }

    const id = this.params.id;
    const trek = await getPostById(id);

    // if(trek.ownerId === localStorage.getItem('ownerId')) {
    //     data.isOwner = true;
    // }
    
    Object.assign(data, trek);
    this.partial('../../templates/edit.hbs', data);
}


export async function editPost() {
    const params = this.params;
    const id = this.params.id;
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const data = {
        description: params.description,
        location: params.location,
        trekDate: params.dateTime
    }

    const res = await updatePost(id, data);

    if(res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 3000)
        return;
    }

    loadingBoxEl.style.display = 'none';
    successBoxEl.textContent = 'Trek edited succesfully!';
    successBoxEl.style.display = 'block';

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this), 1500);
}