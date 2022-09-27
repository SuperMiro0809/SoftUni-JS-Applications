import { updateMovie, getMovieById } from '../data.js';

export default async function () {
    const id = this.params.id;
    const notifications = document.getElementsByClassName('notifications');
    const successBoxEl = notifications[1];
    const errorBoxEl = notifications[0];

    const movie = await getMovieById(id);

    if (movie.hasOwnProperty('errorData')) {
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    }

    const email = localStorage.getItem('email');

    if (movie.likedUsers.includes(email)) {
        errorBoxEl.textContent = 'You alredy liked this movie!';
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    }

    const likedUsers =  movie.likedUsers;
    // console.log(likedUsers)
    likedUsers.push(email)
    const data = {
        likes: Number(movie.likes) + 1,
        likedUsers: likedUsers
    }

    //console.log(data)

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

    successBoxEl.textContent = 'Liked successfully';
    successBoxEl.style.display = 'block';

    // const likedEl = document.getElementById('liked')

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this), 1000);

    // successBoxEl.addEventListener('click', function () {
    //     successBoxEl.textContent = '';
    //     successBoxEl.style.display = 'none';
    //     this.redirect(`#/details/${id}`);
    // }.bind(this))
}
