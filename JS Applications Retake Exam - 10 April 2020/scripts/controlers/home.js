import { getPosts } from '../data.js';

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
    
    if (data.loggedIn === true) {

        const allPosts = await getPosts();
        allPosts.forEach(post => {
            if (post.ownerId === localStorage.getItem('ownerId')) {
                articlesData.articles.push(post);
            }
        });
    }

    Object.assign(data, articlesData)

    this.partial('../../templates/home.hbs', data);
}