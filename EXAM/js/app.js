import home from './controlers/home.js';
import login, {loginUser} from './controlers/login.js';
import register, {registerUser} from './controlers/register.js';
import logout from './controlers/logout.js';
import create, {createIdea} from './controlers/create.js';
import details from './controlers/details.js';
import edit, {editMovie} from './controlers/edit.js';
import deleteMovie from './controlers/delete.js';
import like from './controlers/like.js';
import search from './controlers/search.js';

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            isOwner: false,
            isLiked: false
        };
        
        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);
        this.get('#/', home);

        this.get('#/login', login);
        this.post('#/login', (cxt) => {loginUser.call(cxt)});

        this.get('#/register', register);
        this.post('#/register', (cxt) => {registerUser.call(cxt)})

        this.get('#/logout', logout);

        this.get('#/create', create);
        this.post('#/create', (cxt) => {createIdea.call(cxt)})

        this.get('#/details/:id', details);

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', (cxt) => {editMovie.call(cxt)});

        this.get('#/delete/:id', deleteMovie);

        // this.get('#/close/:id', close);

        this.get('#/like/:id', like);

        //this.get('#/search', search)
        this.post('#/search', (cxt) => {search.call(cxt)})

        // this.get('#/profile', profile);

        // this.post('#/comment/:id', (cxt) => {commentOnIdea.call(cxt)});
        // this.get('#/edit/:id', edit);
        // this.post('#/edit/:id', (cxt) => {editPost.call(cxt)});
    })

    window.onload = window.localStorage.clear();
    app.run()
})