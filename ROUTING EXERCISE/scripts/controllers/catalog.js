import { getTeams } from '../data.js';

export default async function () {
    const userData = this.app.userData;
    if (userData.loggedIn === true) {
        this.partials = {
            header: await this.load('./templates/common/header.hbs'),
            footer: await this.load('./templates/common/footer.hbs'),
            team: await this.load('./templates/catalog/team.hbs')
        };
        const data = Object.assign({}, this.app.userData);
        data.teams = await getTeams();
        // data.teams = [
        //     {
        //         _id: '1234',
        //         name: 'Cherry',
        //         comment: 'Some Comment'
        //     },
        //     {
        //         _id: '1234323',
        //         name: 'Orange',
        //         comment: 'Some Comment'
        //     },
        //     {
        //         _id: '1234544',
        //         name: 'Banana',
        //         comment: 'Some Comment'
        //     }
        // ]
        this.partial('./templates/catalog/teamCatalog.hbs', data);
    } else {
        alert('You are not logged in!');
        this.redirect('#/login');
        return;
    }
}