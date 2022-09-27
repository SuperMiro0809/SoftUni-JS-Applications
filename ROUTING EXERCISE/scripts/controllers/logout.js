import {logoutUser} from '../data.js';

export function logout() {
    const userToken = localStorage.getItem('userToken');
    const userData = this.app.userData;

    if(userData.loggedIn === true) {
        logoutUser(userToken);
        userData.loggedIn = false;
        userData.hasTeam = false;
        userData.username = '';
    
        console.log(userData)
        this.redirect('#/home');
        localStorage.clear();
    }else {
        alert('You are not logged in!');
        this.redirect('#/login');
        return;
    }

}