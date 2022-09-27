import {updateTeam, getTeamById, updateUser} from '../data.js';


export default async function () {
    console.log(localStorage.getItem('isOnTeam'));
    // const userData = this.app.userData;
    // console.log(userData);
    if(localStorage.getItem('isOnTeam') === "false") {
        const userData = this.app.userData;
        const team = await getTeamById(this.params.objectId);
        console.log(team)

        if(team.members[0] !== null) {
            const username = localStorage.getItem('username');
            const data = team.members;
            data.push(username);
            const result = await updateTeam(this.params.objectId, JSON.stringify(data));
            console.log(result);
        }else {
            const data = [];
            const username = localStorage.getItem('username');
            data.push(username);
            const result = await updateTeam(this.params.objectId, JSON.stringify(data)); 
            console.log(result); 
        }
        userData.isOnTeam = true;
        const res = await updateUser("", localStorage.getItem('objectId'), localStorage.getItem('userToken'), true, this.params.objectId)
        localStorage.setItem('isOnTeam', true);
        localStorage.setItem('teamMemberId', this.params.objectId);

        this.redirect(`#/catalog/${this.params.objectId}`)
    }else {
        alert('You are already in a team!');
        //return;
    }
}