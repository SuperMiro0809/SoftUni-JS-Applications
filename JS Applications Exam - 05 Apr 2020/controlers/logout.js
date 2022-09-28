import {logoutUser} from '../data.js';

export default async function () {
    const userData = this.app.userData;
    const allArticles = this.app.allArticles;

    if(userData.loggedIn === true) {
        const userToken = localStorage.getItem('user-token');

        await logoutUser(userToken);

        userData.loggedIn = false;
        userData.isOwner = false;
        localStorage.clear();
        Object.keys(allArticles).forEach(key => {
            allArticles[key] = [];
        })
        this.redirect('#/login');
    }else {
        alert('You are not logged in!');
        this.redirect('#/login');
        return;
    }
}