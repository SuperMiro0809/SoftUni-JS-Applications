import { createNewArticle, updateUser } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    if (this.app.userData.loggedIn === false) {
        this.redirect('#/login');
    }

    this.partial('../../templates/create.hbs', this.app.userData);
}

export async function createEvent() {
    const params = this.params;
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';


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
        organizer: sessionStorage.getItem('username'),
        peopleInterestedIn: 0,
        description: params.description,
        image: params.imageURL
    }

    const res = await createNewArticle(sessionStorage.getItem('user-token'), data);

    if (res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';


        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    } else {
        loadingBoxEl.style.display = 'none';
        successBoxEl.textContent = 'Event created successfully.';
        successBoxEl.style.display = 'block';

        if (sessionStorage.getItem('events') === '') {
            const events = params.name;
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
        } else {

            const events = sessionStorage.getItem('events').split(',');
            events.push(params.name);
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
            this.redirect('#/');
        }.bind(this), 3000)

        successBoxEl.addEventListener('click', function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/');
        }.bind(this))
    }
    console.log(res);
}