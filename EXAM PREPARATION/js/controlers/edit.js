import { getEventById, updateEvent, updateUser } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;

    if (this.app.userData.loggedIn === false) {
        this.redirect('#/login');
    }
    // const usernameObj = {};
    // if(data.loggedIn === true) {
    //     usernameObj.username = localStorage.getItem('username');
    //     Object.assign(data, usernameObj)
    // }

    const id = this.params.id;
    const event = await getEventById(id);

    // if(trek.ownerId === localStorage.getItem('ownerId')) {
    //     data.isOwner = true;
    // }

    Object.assign(data, event);
    this.partial('../../templates/edit.hbs', data);
}


export async function editEvent() {
    const params = this.params;
    const id = this.params.id;
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';

    const event = await getEventById(id);
    const name = event.name;

    try {
        if (params.name.length < 6) {
            throw new Error('The event name should be at least 6 characters long!')
        } else if (params.dateTime === '') {
            throw new Error('Date must not be empty!');
        } else if (params.description.length < 10) {
            throw new Error('The description should be at least 10 characters long!');
        } else if (params.imageURL.slice(0, 7) !== 'http://' && params.imageURL.slice(0, 8) !== 'https://') {
            throw new Error('Image url is not valid!');
        }
    } catch (err) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = err.message;
        errorBoxEl.style.display = 'block';

        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    }

    const data = {
        name: params.name,
        timeDate: params.dateTime,
        description: params.description,
        image: params.imageURL
    }

    const res = await updateEvent(id, data);

    if (res.hasOwnProperty('errorData')) {
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
    successBoxEl.textContent = 'Event edited successfully.';
    successBoxEl.style.display = 'block';

    if (name !== params.name) {
        const events = sessionStorage.getItem('events').split(',');
        const index = events.indexOf(name);
        events.splice(index, 1);
        events[index] = params.name;

        const userRes = await updateUser(sessionStorage.getItem('ownerId'), sessionStorage.getItem('user-token'), { events: events });

        if (userRes.hasOwnProperty('errorData')) {
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
    }

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this), 1500);

    successBoxEl.addEventListener('click', function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect('#/details/${id}');
    }.bind(this))
}