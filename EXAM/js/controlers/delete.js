import {deleteMovieById} from '../data.js';

export default async function () {
    const id = this.params.id;
    const token = localStorage.getItem('user-token');
    const notifications = document.getElementsByClassName('notifications');
    const successBoxEl = notifications[1];
    const errorBoxEl = notifications[0];

    const res = await deleteMovieById(id, token);


    if(res.hasOwnProperty('errorData')) {
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    }

    successBoxEl.textContent = 'Deleted successfully';
    successBoxEl.style.display = 'block';

    

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect('#/home');
    }.bind(this), 1000);

    // successBoxEl.addEventListener('click', function () {
    //     successBoxEl.textContent = '';
    //     successBoxEl.style.display = 'none';
    //     this.redirect('#/');
    // }.bind(this))
}