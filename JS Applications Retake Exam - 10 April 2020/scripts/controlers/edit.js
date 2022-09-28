import { getPosts, updatePost } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        post: await this.load('../../templates/post.hbs')
    }
    const data = this.app.userData;
    const emailObj = {
        email: localStorage.getItem('email')
    }
    Object.assign(data, emailObj);
    const articlesData = this.app.articlesData;
    articlesData.articles = [];
    let currPost = {};

    if (data.loggedIn === true) {
        const id = this.params.id;
        const allPosts = await getPosts();
        allPosts.forEach(post => {
            if (post.ownerId === localStorage.getItem('ownerId')) {
                articlesData.articles.push(post);
            }
            if (post.objectId === id) {
                currPost = post;
            }
        });
    } else {
        alert('You are not logged in!');
        this.redirect('#/login');
    }

    Object.assign(data, articlesData)
    Object.assign(data, currPost);
    this.partial('../../templates/edit.hbs', data);
}

export async function editPost() {
    const params = this.params;
    const id = this.params.id;
    const notificationEl = document.getElementById('notification');

    const res = await updatePost(id, params);

    if(res.hasOwnProperty('errorData')) {
        notificationEl.textContent = res.message;
        notificationEl.style.background = 'red';
        notificationEl.style.display = 'block';
        registerButton.textContent = 'Submit';
        setTimeout(function () {
            notificationEl.textContent = '';
            notificationEl.style.background = '';
            notificationEl.style.display = 'none';
        }, 3000)
        return;
    }

    this.redirect('#/');
    notificationEl.textContent = 'Успешно редактирахте пост!';
    notificationEl.style.display = 'block';

    setTimeout(function () {
        notificationEl.textContent = '';
        notificationEl.style.display = 'none';
    }, 3000);
}