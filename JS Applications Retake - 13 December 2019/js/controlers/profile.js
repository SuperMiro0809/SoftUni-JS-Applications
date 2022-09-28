export default async function() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs'),
    }
    const data = this.app.userData;
    const usernameObj = {};
    if(data.loggedIn === true) {
        usernameObj.username = localStorage.getItem('username');
        if(localStorage.getItem('ideas') === '') {
            usernameObj.ideas = [];
            usernameObj.count = 0;
        }else {
            usernameObj.ideas = localStorage.getItem('ideas').split(',');
            usernameObj.count = localStorage.getItem('ideas').split(',').length;
        }
        Object.assign(data, usernameObj);
    }


    this.partial('../../templates/profile.hbs', data);
}