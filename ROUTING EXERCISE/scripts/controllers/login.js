import { loginUser } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    };

    this.partial('./templates/login/loginPage.hbs');
}

export async function loginIn() {
    const userData = this.app.userData;
    const userInfo = this.params;

    const result = await loginUser(userInfo.username, userInfo.password);

    if(result.hasOwnProperty('errorData')) {
        alert(result.message);
        return;
    }
    console.log(result)
    if(result.teamId !== null && result.teamId !== '') {
        localStorage.setItem('teamId', result.teamId)
        localStorage.setItem('isOnTeam', true)
        userData.hasTeam = true;
        userData.isAuthor = true;
        userData.isOnTeam = true;
        localStorage.setItem('isOnTeam', true)
    }
    if(result.isOnTeam === true) {
        userData.isOnTeam = true;
        userData.isAuthor = false;
        localStorage.setItem('isOnTeam', true)
        localStorage.setItem('teamMemberId', result.teamMemberId);
    }else {
        userData.isOnTeam = false;
        userData.isAuthor = false;
        localStorage.setItem('isOnTeam', false)
        localStorage.setItem('teamMemberId', "");
    }
    userData.loggedIn = true;
    userData.username = result.username;
    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('objectId', result.ownerId);
    localStorage.setItem('loggedIn', true)
    this.redirect('#/home');


}