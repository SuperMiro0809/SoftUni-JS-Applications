import {getRecipes} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;
    const namesObj = {};
    if(data.loggedIn === true) {
        namesObj.names = sessionStorage.getItem('names');
        const recepies = await getRecipes();
        if(recepies.length === 0) {
            namesObj.recepies = [];
        }else {
            namesObj.recepies = recepies;
        }
        Object.assign(data, namesObj);
    }
    this.partial('../../templates/home.hbs', data);
}