import {createNewIdea, updateUser} from '../data.js';

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
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';


    try {
        if (params.title.length < 4) {
            throw new Error('The title should be at least 4 characters long!')
        }else if(params.description.length < 10) {
            throw new Error('The description method should be at least 10 characters long!');
        }else if (params.imageURL.slice(0, 7) !== 'http://' && params.imageURL.slice(0, 8) !== 'https://') {
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
        title: this.params.title,
        description: this.params.description,
        image: this.params.imageURL,
        creator: localStorage.getItem('username'),
        likes: 0,
        comments: []
    }

    const res = await createNewIdea(localStorage.getItem('user-token'), data);

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
        successBoxEl.textContent = 'Idea created successfully.';
        successBoxEl.style.display = 'block';

        let ideas = localStorage.getItem('ideas').split(',');
        if(ideas[0] === '') {
            ideas = [params.title];
            const userRes = await updateUser(localStorage.getItem('ownerId'), localStorage.getItem('user-token'), { ideas: ideas });

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
        }else {
            ideas.push(params.title);
            const userRes = await updateUser(localStorage.getItem('ownerId'), localStorage.getItem('user-token'), { ideas: ideas });

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
        }

        localStorage.setItem('ideas', ideas);
        

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/home');
        }.bind(this), 3000)

        successBoxEl.addEventListener('click', function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/home');
        }.bind(this))
    }

}