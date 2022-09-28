import home from '../scripts/controlers/home.js';
import login, {loginUser} from '../scripts/controlers/login.js';
import register from '../scripts/controlers/register.js';
import {registerUser} from '../scripts/controlers/register.js';
import logout from '../scripts/controlers/logout.js';
import create from '../scripts/controlers/create.js';
import details from '../scripts/controlers/details.js';
import deletePost from '../scripts/controlers/delete.js';
import edit, {editPost} from '../scripts/controlers/edit.js';

$(() => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            isOwner: false
        }

        this.articlesData = {
            articles: []
        }

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);
        this.get('#/', home);

        this.get('#/login', login);
        this.post('#/login', (cxt) => {loginUser.call(cxt)});

        this.get('#/register', register);
        this.post('#/register', (cxt) => {registerUser.call(cxt)})

        this.get('#/logout', logout);

        this.post('#/create-post', (cxt) => {create.call(cxt)});

        this.get('#/details/:id', details);

        this.get('#/delete/:id', deletePost);

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', (cxt) => {editPost.call(cxt)});
        // this.get('#/login', login);
        // this.post('#/login', (cxt) => { loginUser.call(cxt) });

        // this.get('#/register', register);
        // this.post('#/register', (cxt) => { registerUser.call(cxt) });

        // this.get('#/logout', logout);

        // this.get('#/create', create);
        // this.post('#/create', (cxt) => {createArticle.call(cxt)});

        // this.get('#/home/:objectId', details);

        // this.get('#/edit/:objectId', edit);
        // this.post('#/edit/:objectId', (cxt) => {editTeam.call(cxt)});

        // this.get('#/delete/:objectId', deleteArticle)
    })

    window.onload = window.localStorage.clear();
    app.run()
})