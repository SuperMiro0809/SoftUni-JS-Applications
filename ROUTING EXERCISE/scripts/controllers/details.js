import { getDetails, getTeamById } from '../data.js';

export default async function () {
    const userData = this.app.userData;
    if (userData.loggedIn === true) {
        this.partials = {
            header: await this.load('./templates/common/header.hbs'),
            footer: await this.load('./templates/common/footer.hbs'),
            teamMember: await this.load('./templates/catalog/teamMember.hbs'),
            teamControls: await this.load('./templates/catalog/teamControls.hbs')
        };

        console.log(this)
        const res = await getDetails(this.params.objectId);
        const team = await getTeamById(this.params.objectId);

        if (this.params.objectId !== localStorage.getItem('teamId')) {
            userData.isAuthor = false;
            userData.isOnTeam = false;
        } else {
            userData.isAuthor = true;
            userData.isOnTeam = true;
        }

        const teamMembers = team.members;
        let data;

        if (teamMembers !== null) {

            if (teamMembers.includes(localStorage.getItem('username'))) {
                userData.isOnTeam = true;
            }
    
            data = {
                objectId: this.params.objectId,
                name: res.name,
                comment: res.comment,
                members: []
            };

            teamMembers.forEach((member) => {
                data.members.push({ username: member });
            })

        }else {
            data = {
                objectId: this.params.objectId,
                name: res.name,
                comment: res.comment,
                members: []
            };
        }

        Object.assign(data, this.app.userData);

        this.partial('./templates/catalog/details.hbs', data);
    } else {
        alert('You are not logged in!');
        this.redirect('#/login');
        return;
    }
}