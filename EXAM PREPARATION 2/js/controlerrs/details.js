import {getRecipeById} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs'),
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
    const event = await getRecipeById(id);

    if(event.ownerId === sessionStorage.getItem('ownerId')) {
        data.isOwner = true;
    }
    
    Object.assign(data, event);
    this.partial('../../templates/details.hbs', data);
}