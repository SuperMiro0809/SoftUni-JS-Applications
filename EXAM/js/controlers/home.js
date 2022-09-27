import {getMovies} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;
    const namesObj = {};
    if(data.loggedIn === true) {
        namesObj.email = localStorage.getItem('email');
        const movies = await getMovies();
        if(movies.length === 0) {
            namesObj.movies = [];
        }else {
            //movies.sort((a,b) => Number(b.likes) - Number(a.likes))
            namesObj.movies = movies;
        }
        Object.assign(data, namesObj);
    }
    this.partial('../../templates/home.hbs', data);
}