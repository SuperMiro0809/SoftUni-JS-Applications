import home from './controlerrs/home.js';
import login, {loginUser} from './controlerrs/login.js';
import register, {registerUser} from './controlerrs/register.js';
import logout from './controlerrs/logout.js';
import share, {createRecepie} from './controlerrs/share.js';
import details from './controlerrs/details.js';
import edit, {editReceipe} from './controlerrs/edit.js';
import deleteReceipe from './controlerrs/deletse.js';
import like from './controlerrs/like.js';

$(() => {
    const app = Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            isOwner: false
        };

        this.categories = {
            'Vegetables and legumes/beans': 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
            'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
            'Grain Food': 'https://snackymatz.com/wp-content/uploads/2017/03/corn-syrup-563796__340-300x200.jpg',
            'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
            'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
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

        this.get('#/share', share);
        this.post('#/share', (cxt) => {createRecepie.call(cxt)})

        this.get('#/details/:id', details);

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', (cxt) => {editReceipe.call(cxt)});

        this.get('#/delete/:id', deleteReceipe);

        // this.get('#/close/:id', close);

        this.get('#/like/:id', like);

        // this.get('#/profile', profile)
        // this.get('#/edit/:id', edit);
        // this.post('#/edit/:id', (cxt) => {editPost.call(cxt)});
    })

    window.onload = window.sessionStorage.clear();
    app.run()
})