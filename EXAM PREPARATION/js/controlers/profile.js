import {getAllarticles} from '../data.js';

export default async function() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
    }
    const data = this.app.userData;
    const usernameObj = {};
    if(data.loggedIn === true) {
        usernameObj.username = sessionStorage.getItem('username');
        if(sessionStorage.getItem('events') === '') {
            usernameObj.events = [];
            usernameObj.count = 0;
        }else {
            usernameObj.events = sessionStorage.getItem('events').split(',');
            usernameObj.count = sessionStorage.getItem('events').split(',').length;
        }
        Object.assign(data, usernameObj);
    }


    this.partial('../../templates/profile.hbs', data);
}