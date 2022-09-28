import {getPostById} from '../data.js';

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

    if(trek.ownerId === localStorage.getItem('ownerId')) {
        data.isOwner = true;
    }
    
    Object.assign(data, trek);
    this.partial('../../templates/details.hbs', data);
}