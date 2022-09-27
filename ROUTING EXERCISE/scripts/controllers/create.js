import {createTeam} from '../data.js';
import {updateUser} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createForm: await this.load('./templates/create/createForm.hbs')
    };
    const data = Object.assign({}, this.app.userData);

    this.partial('./templates/create/createPage.hbs', data);
}

export async function createdTeam() {
    const userData = this.app.userData;
    
    if(userData.loggedIn === true) {
        const userToken = localStorage.getItem('userToken');
        const data = this.params;
        data.members = [localStorage.getItem('username')]

        const result = await createTeam(userToken, data);

        userData.hasTeam = true;
        userData.isAuthor = true;
        userData.isOnTeam = true;
        localStorage.setItem('hasTeam', true);
        localStorage.setItem('isOnTeam', true);
        console.log(result);
        const res = await updateUser(result.objectId, result.ownerId, userToken, true, "");
        localStorage.setItem('teamId', result.objectId)
        console.log(res);

        this.redirect('#/catalog');
    }else {
        alert('You are not logged in!');
        this.redirect('#/login');
        return;
    }

}