import {getPostById, updatePost} from '../data.js';

export default async function () {
    const likes = document.getElementById('likes')
    const id = this.params.id;
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const data = {
        likes: Number(likes.textContent) + 1
    }

    const res = await updatePost(id, data);

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
    successBoxEl.textContent = 'You liked the tred succesfully!';
    successBoxEl.style.display = 'block';

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this), 1500);
}
