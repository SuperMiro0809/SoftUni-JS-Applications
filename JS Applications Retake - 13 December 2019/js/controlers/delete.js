import {deleteIdeaById, updateUser} from '../data.js';

export default async function () {
    const id = this.params.id;
    const token = localStorage.getItem('user-token');
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const res = await deleteIdeaById(id, token);


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
    successBoxEl.textContent = 'Idea deleted successfully.';
    successBoxEl.style.display = 'block';

    const ideas = localStorage.getItem('ideas').split(',');
    const title = document.getElementById('title').textContent;
    const index = ideas.indexOf(title);
    ideas.splice(index, 1);

    const userRes = await updateUser(localStorage.getItem('ownerId'), localStorage.getItem('user-token'), {ideas: ideas});

    if(userRes.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = userRes.message;
        errorBoxEl.style.display = 'block';

     
        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    }

    localStorage.setItem('ideas', ideas);

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect('#/');
    }.bind(this), 2000);

    successBoxEl.addEventListener('click', function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect('#/');
    }.bind(this))
}