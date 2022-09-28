import {getPosts} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;
    let usernameObj = {}; 
    const res = await getPosts();
    if(data.loggedIn === true) {
        let count = 0;
        usernameObj.username = localStorage.getItem('username');
        usernameObj.treks = [];
        res.forEach(t => {
            if(t.ownerId === localStorage.getItem('ownerId')) {
                count++;
                usernameObj.treks.push(t);
            }
        });

        usernameObj.count = count;
        Object.assign(data, usernameObj)
    }
    this.partial('../../templates/profile.hbs', data);
}
