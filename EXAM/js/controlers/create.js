import {createNewMovie} from '../data.js'; 

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

export async function createIdea() {
    const params = this.params;
    const notifications = document.getElementsByClassName('notifications');
    const successBoxEl = notifications[1];
    const errorBoxEl = notifications[0];


    try {
        if (params.title.length === 0) {
            throw new Error('The title shouldn\'t be empty!')
        }else if(params.description.length === 0) {
            throw new Error('The description shouldn\'t be empty!');
        }else if(params.imageUrl.length === 0) {
            throw new Error('The image url shouldn\'t be empty!');
        }else if (params.imageUrl.slice(0, 7) !== 'http://' && params.imageUrl.slice(0, 8) !== 'https://') {
            throw new Error('Image url is not valid!');
        }

    } catch (err) {
        errorBoxEl.textContent = err.message;
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    }

    const data = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.imageUrl,
        creator: localStorage.getItem('email'),
        likes: 0,
        likedUsers: []
    }

    const res = await createNewMovie(localStorage.getItem('user-token'), data);

    if (res.hasOwnProperty('errorData')) {
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';


        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        }, 1000)
        return;
    } else {
        successBoxEl.textContent = 'Created successfully!';
        successBoxEl.style.display = 'block';

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/home');
        }.bind(this), 1000)

        // successBoxEl.addEventListener('click', function () {
        //     successBoxEl.textContent = '';
        //     successBoxEl.style.display = 'none';
        //     this.redirect('#/home');
        // }.bind(this))
    }

}