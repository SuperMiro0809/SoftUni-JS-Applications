import {updateUser, updateTeam, getTeamById} from '../data.js';

export default async function () {
    if(localStorage.getItem('isOnTeam')) {
        const userData = this.app.userData;

        if(userData.isAuthor === true) {
            userData.isAuthor = false;
            userData.hasTeam = false;
            const userId = localStorage.getItem('objectId');
            const userToken = localStorage.getItem('userToken');
            const teamId = "";

            const res = await updateUser(teamId, userId, userToken, false);
        }else {
            const userId = localStorage.getItem('objectId');
            const userToken = localStorage.getItem('userToken');
            const res = await updateUser("", userId, userToken, false, "");
        }
        userData.isOnTeam = false;
        const username = localStorage.getItem('username');
        const teamId = localStorage.getItem('teamId') || localStorage.getItem('teamMemberId');

        const team = await getTeamById(teamId);
        console.log(team);
        const members = team.members;
        const indexOfMember = members.indexOf(username);
        members.splice(indexOfMember, 1);

        const resTeam = await updateTeam(teamId, members);

        localStorage.setItem('teamId', "");
        localStorage.setItem('teamMemberId', "");
        localStorage.setItem('isOnTeam', false);

        this.redirect(`#/catalog/${teamId}`)

        console.log(userData)
    }else {
        alert('You are not in a team!');
        return;
    }
}