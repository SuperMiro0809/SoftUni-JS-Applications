import {updateRecipe} from '../data.js';

export default async function () {
    console.log(document.getElementById('likes').textContent)
    const likes = document.getElementById('likes').textContent.split(' ')[0]
    const id = this.params.id;
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const data = {
        likesCounter: Number(likes) + 1
    }

    const res = await updateRecipe(id, data);

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
    successBoxEl.textContent = 'You liked that recipe.';
    successBoxEl.style.display = 'block';

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this), 1500);

    successBoxEl.addEventListener('click', function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this))
}
