import { getArticleById } from '../data.js';

export default async function () {
    const data = this.app.userData;
    if (data.loggedIn === true) {
        this.partials = {
            header: await this.load('../templates/header.hbs'),
            footer: await this.load('../templates/footer.hbs')
        }
        // const data = this.app.userData;
        const id = this.params.objectId;
        console.log(id)
        const team = await getArticleById(id);

        if (team.ownerId === localStorage.getItem('ownerId')) {
            data.isOwner = true;
        }else {
            data.isOwner = false;
        }

        Object.assign(data, team)
        console.log(team);
        this.partial('../templates/details.hbs', this.app.userData);
    } else {
        alert('You are not logged in!');
        this.redirect('#/login');
        return;
    }
}