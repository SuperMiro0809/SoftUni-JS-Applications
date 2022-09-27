import {getRecipeById, updateRecipe} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        notifications: await this.load('../../templates/notifications.hbs')
    }

    const data = this.app.userData;

    if (this.app.userData.loggedIn === false) {
        this.redirect('#/login');
    }
    // const usernameObj = {};
    // if(data.loggedIn === true) {
    //     usernameObj.username = localStorage.getItem('username');
    //     Object.assign(data, usernameObj)
    // }

    const id = this.params.id;
    const event = await getRecipeById(id);

    // if(trek.ownerId === localStorage.getItem('ownerId')) {
    //     data.isOwner = true;
    // }

    event.ingredients = event.ingredients.join(', ');
    Object.assign(data, event);
    await this.partial('../../templates/edit.hbs', data);

    const selectEl = document.getElementById('selectCategory');
    const options = Array.from(selectEl.querySelectorAll('option'));

    options.forEach(o => {
        if(o.textContent === event.category) {
            o.selected = true;
        }
    })
}


export async function editReceipe() {
    const params = this.params;
    const id = this.params.id;
    const category = document.getElementById('selectCategory');
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
        categoryImageURL: categoriesImgs[category.value]
    }

    const res = await updateRecipe(id, data);

    if (res.hasOwnProperty('errorData')) {
        loadingBoxEl.style.display = 'none';
        errorBoxEl.textContent = res.message;
        errorBoxEl.style.display = 'block';

        errorBoxEl.addEventListener('click', function () {
            errorBoxEl.textContent = '';
            errorBoxEl.style.display = 'none';
        })
        return;
    }

    loadingBoxEl.style.display = 'none';
    successBoxEl.textContent = 'Receipe edited successfully.';
    successBoxEl.style.display = 'block';

    setTimeout(function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this), 1500);

    successBoxEl.addEventListener('click', function () {
        successBoxEl.textContent = '';
        successBoxEl.style.display = 'none';
        this.redirect(`#/details/${id}`);
    }.bind(this))
}