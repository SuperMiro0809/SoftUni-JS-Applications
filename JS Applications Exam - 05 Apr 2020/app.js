import home from './controlers/home.js';
import login from './controlers/login.js';
import register from './controlers/register.js';
import {registerUser} from './controlers/register.js';
import {loginUser} from './controlers/login.js';
import logout from './controlers/logout.js';
import create from './controlers/create.js';
import {createArticle} from './controlers/create.js';
import details from './controlers/details.js';
import edit from './controlers/edit.js';
import {editTeam} from './controlers/edit.js';
import deleteArticle from './controlers/delete.js'

$(() => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            isOwner: false
        }

        this.articlesData = {
            JSArticle: false,
            CArticle: false,
            JavaAarticle: false,
            PytonArticle: false
        }

        this.allArticles = {
            JavaScript: [],
            C: [],
            Java: [],
            Pyton: []
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
        this.post('#/create', (cxt) => {createArticle.call(cxt)});

        this.get('#/home/:objectId', details);

        this.get('#/edit/:objectId', edit);
        this.post('#/edit/:objectId', (cxt) => {editTeam.call(cxt)});

        this.get('#/delete/:objectId', deleteArticle)
    })

    window.onload = window.localStorage.clear();
    app.run()
})