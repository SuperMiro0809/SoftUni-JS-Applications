import {createNewRecipes} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    if (this.app.userData.loggedIn === false) {
        this.redirect('#/login');
    }

    this.partial('../../templates/create.hbs', this.app.userData);
}


export async function createRecepie() {
    const params = this.params;
    const category = document.getElementById('category');
    const categoriesImgs = this.app.categories;
    const successBoxEl = document.getElementById('successBox');
    const errorBoxEl = document.getElementById('errorBox');
    const loadingBoxEl = document.getElementById('loadingBox');
    loadingBoxEl.style.display = 'block';


    try {
        if (params.meal.length < 4) {
            throw new Error('The meal should be at least 4 characters long!')
        } else if (params.ingredients.split(', ').length < 2) {
            throw new Error('The ingredients should at least 2!');
        } else if (params.prepMethod.length < 10) {
            throw new Error('The preparation method should be at least 10 characters long!');
        }else if(params.description.length < 10) {
            throw new Error('The description method should be at least 10 characters long!');
        }else if (params.foodImageURL.slice(0, 7) !== 'http://' && params.foodImageURL.slice(0, 8) !== 'https://') {
            throw new Error('Image url is not valid!');
        }else if(category.value === 'Select category...') {
            throw new Error('Select category!');
        }
    } catch (err) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = err.message;
        errorBoxEl.style.display = 'block';

        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    }

    const data = {
        meal: params.meal,
        ingredients: params.ingredients.split(', '),
        prepMethod: params.prepMethod,
        description: params.description,
        foodImageURL: params.foodImageURL,
        category: category.value,
        likesCounter: 0,
        categoryImageURL: categoriesImgs[category.value]
    }

    const res = await createNewRecipes(sessionStorage.getItem('user-token'), data);

    if (res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';


        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    } else {
        loadingBoxEl.style.display = 'none';
        successBoxEl.textContent = 'Event created successfully.';
        successBoxEl.style.display = 'block';

        setTimeout(function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/home');
        }.bind(this), 3000)

        successBoxEl.addEventListener('click', function () {
            successBoxEl.textContent = '';
            successBoxEl.style.display = 'none';
            this.redirect('#/home');
        }.bind(this))
    }
    console.log(res);
}