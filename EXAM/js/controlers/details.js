import {getMovieById} from '../data.js';

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
    const movie = await getMovieById(id);
    const email = localStorage.getItem('email');

    if(movie.ownerId === localStorage.getItem('ownerId')) {
        data.isOwner = true;
    }else {
        data.isOwner = false;

        if(movie.likedUsers.includes(email)) {
            data.isLiked = true;
        }else {
            data.isLiked = false;
        }
    }

    
    Object.assign(data, movie);
    this.partial('../../templates/details.hbs', data);
}