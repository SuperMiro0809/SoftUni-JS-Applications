import { getMovies } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;
    const params = this.params;

    const allMovies = await getMovies();

    if (allMovies.hasOwnProperty('errorData')) {
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    }

    if (!params.title) {
        Object.assign(data, { movies: allMovies })
    } else {

        let movie;
        let isFound = false;
        allMovies.forEach(m => {
            if (m.title === params.title) {
                movie = m;
                isFound = true;
            }
        });
        if(isFound) {
            Object.assign(data, { movies: [movie] })
        }else {
            Object.assign(data, { movies: [] })
        }
    }

    this.redirect('#/search')
    this.partial('../../templates/search.hbs', data);
}