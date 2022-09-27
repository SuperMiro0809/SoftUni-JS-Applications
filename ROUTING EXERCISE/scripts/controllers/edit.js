import {editTeamById} from '../data.js';

export default async function () {
    console.log(this);
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        editForm: await this.load('./templates/edit/editForm.hbs')
    };
    const data = this.app.userData;
    if(data.isAuthor !== true) {
        alert('You are not the author of this team!');
        return;
    }
    Object.assign(data, this.params)
    this.partial('./templates/edit/editPage.hbs', data);
}

export async function editTeam() {
    const userData = this.app.userData;

    if(userData.loggedIn === true && userData.isAuthor === true) {
        const id = this.params.objectId;
        const data = {
        'name': this.params.name,
        'comment': this.params.comment
        }
        
        const res = await editTeamById(id, data);

        this.redirect(`#/catalog/${id}`);
    }else {
        alert('You are not logged in!');
        return;
    }
}