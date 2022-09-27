import {getAllarticles} from '../data.js';

export default async function() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }
    const data = this.app.userData;
    const eventsData = this.app.eventsData;
    const usernameObj = {};
    if(data.loggedIn === true) {
        usernameObj.username = sessionStorage.getItem('username');
        Object.assign(data, usernameObj);

        const events = await getAllarticles();

        if(events.length === 0) {
            Object.assign(data, eventsData);
        }else {
            events.sort((a,b) => b.peopleInterestedIn - a.peopleInterestedIn);
            eventsData.events = events;
            Object.assign(data, eventsData);
        }
    }


    this.partial('../../templates/home.hbs', data);
}