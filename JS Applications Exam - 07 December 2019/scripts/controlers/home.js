import {getPosts} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs'),
        treks: await this.load('../../templates/trek.hbs')
    }

    const data = this.app.userData;
    const usernameObj = {};
    if(data.loggedIn === true) {
        usernameObj.username = localStorage.getItem('username');
        Object.assign(data, usernameObj)
    }

    const res = await getPosts();
    if(res.length !== 0) {
        res.sort((a,b) => b.likes - a.likes);
        this.app.treksData.areTreks = true;
        this.app.treksData.treks = res;
    }

    Object.assign(data, this.app.treksData)
    this.partial('../../templates/home.hbs', data);
}