import {logoutUser} from '../data.js';

export default async function () {
    const userData = this.app.userData;

    if(userData.loggedIn === true) {
        const userToken = localStorage.getItem('user-token');

        await logoutUser(userToken);

        userData.loggedIn = false;
        userData.isOwner = false;
        localStorage.clear();
        
        this.redirect('#/');
    }else {
        alert('You are not logged in!');
        this.redirect('#/login');
        return;
    }
}