import {deleteEvent, updateUser} from '../data.js';

export default async function () {
    const id = this.params.id;
    const token = sessionStorage.getItem('user-token');
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const res = await deleteEvent(id, token);


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
    successBoxEl.textContent = 'Event closed successfully.';
    successBoxEl.style.display = 'block';

    const events = sessionStorage.getItem('events').split(',');
    const name = document.getElementById('name').textContent;
    const index = events.indexOf(name);
    events.splice(index, 1);

    const userRes = await updateUser(sessionStorage.getItem('ownerId'), sessionStorage.getItem('user-token'), {events: events});

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

    sessionStorage.setItem('events', events);

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