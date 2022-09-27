import home from './controllers/home.js';
import about from './controllers/about.js';
import login from './controllers/login.js';
import register from './controllers/register.js';
import catalog from './controllers/catalog.js';
import {registerUser} from './controllers/register.js';
import {loginIn} from './controllers/login.js';
import {logout} from './controllers/logout.js';
import create from './controllers/create.js';
import {createdTeam} from './controllers/create.js';
import details from './controllers/details.js';
import join from './controllers/join.js';
import edit from './controllers/edit.js';
import {editTeam} from './controllers/edit.js';
import leave from './controllers/leave.js';

$(() => {
   const app = Sammy('#main', function () {
       this.use('Handlebars', 'hbs');

       this.userData = {
           loggedIn: localStorage.getItem('loggedIn') || false,
           hasTeam: localStorage.getItem('hasTeam') || false,
           isAuthor: false,
           isOnTeam: false
       };

       console.log(this)

       this.get('index.html', home);
       this.get('#/home', home);
       this.get('/', home);

       this.get('#/about', about);

       this.get('#/register', register);

       this.get('#/login', login);

       this.get('#/catalog', catalog);

       this.post('#/register', (cxt) => { registerUser.call(cxt); });

       this.post('#/login', (cxt) => { loginIn.call(cxt); });

       this.get('#/logout', (cxt) => { logout.call(cxt)});

       this.get('#/create', create);

       this.post('#/create', (cxt) => { createdTeam.call(cxt); });

       this.get('#/catalog/:objectId', details);
       
       this.get('#/join/:objectId', join);

       this.get('#/edit/:objectId', edit);

       this.post('#/edit/:objectId', (cxt) => { editTeam.call(cxt); });

       this.get('#/leave', leave);

   }); 
   window.onload = window.localStorage.clear();
   app.run();
})

