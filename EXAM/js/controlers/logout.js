import {logoutUser} from '../data.js';

export default async function () {
    const userData = this.app.userData;
    const notifications = document.getElementsByClassName('notifications');
    const successBoxEl = notifications[1];
    const errorBoxEl = notifications[0];

    if(userData.loggedIn === true) {
        const userToken = sessionStorage.getItem('user-token');

        await logoutUser(userToken);
        successBoxEl.textContent = 'Successful logout';
        successBoxEl.style.display = 'block';

        userData.loggedIn = false;
        userData.isOwner = false;
        localStorage.clear();

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/login');
        }.bind(this), 1000)

        // this.redirect('#/');
        
    }else {
        errorBoxEl.textContent = 'You are not logged in!';
        errorBoxEl.style.display = 'block';

        setTimeout(function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
            this.redirect('#/login');
        }.bind(this), 1000)
        // alert('You are not logged in!');
        //this.redirect('#/login');
        return;
    }
}