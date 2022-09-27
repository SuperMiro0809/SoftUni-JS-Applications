import {deleteRecipeById} from '../data.js';

export default async function () {
    const id = this.params.id;
    const token = sessionStorage.getItem('user-token');
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const res = await deleteRecipeById(id, token);


    if(res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    }

    loadingBoxEl.style.display = 'none';
    successBoxEl.textContent = 'Your recipe was archived.';
    successBoxEl.style.display = 'block';

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect('#/home');
    }.bind(this), 2000);

    successBoxEl.addEventListener('click', function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect('#/home');
    }.bind(this))
}