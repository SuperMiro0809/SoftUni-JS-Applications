import home from './controlers/home.js';
import login, {loginUser} from './controlers/login.js';
import register, {registerUser} from './controlers/register.js';
import logout from './controlers/logout.js';
import create, {createEvent} from './controlers/create.js';
import details from './controlers/details.js';
import edit, {editEvent} from './controlers/edit.js';
import close from './controlers/close.js';
import profile from './controlers/profile.js';
import like from './controlers/like.js';

$(() => {
    const app = Sammy('body', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            isOwner: false
        }

        this.eventsData = {
            events: []
        }

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

    
        this.get('#/login', login);
        this.post('#/login', (cxt) => { loginUser.call(cxt) });

        this.get('#/register', register);
        this.post('#/register', (cxt) => { registerUser.call(cxt) });

        this.get('#/logout', logout);

        this.get('#/create', create);
        this.post('#/create', (cxt) => {createEvent.call(cxt)});

        this.get('#/details/:id', details);

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', (cxt) => {editEvent.call(cxt)}); 

        this.get('#/close/:id', close);

        this.get('#/profile', profile);

        this.get('#/like/:id', like)
        // this.get('#/delete/:objectId', deleteArticle)
    })

    window.onload = window.sessionStorage.clear();
    app.run()
})