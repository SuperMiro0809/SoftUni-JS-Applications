import {getIdeas} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;
    const namesObj = {};
    if(data.loggedIn === true) {
        const ideas = await getIdeas();
        if(ideas.length === 0) {
            namesObj.ideas = [];
        }else {
            ideas.sort((a,b) => Number(b.likes) - Number(a.likes))
            namesObj.ideas = ideas;
        }
        Object.assign(data, namesObj);
    }
    this.partial('../../templates/home.hbs', data);
}