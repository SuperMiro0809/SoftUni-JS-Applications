import {deletePostById} from '../data.js';

export default async function () {
    const id = this.params.id;
    const token = localStorage.getItem('user-token');
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const res = await deletePostById(id, token);


    if(res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 3000)
        return;
    }

    loadingBoxEl.style.display = 'none';
    successBoxEl.textContent = 'You closed the trek succesfully';
    successBoxEl.style.display = 'block';

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect('#/');
    }.bind(this), 3000);
}