import {createNewArticle} from '../data.js'

export default async function () {
    const notificationEl = document.getElementById('notification');
    const params = this.params;
    const articlesData = this.app.articlesData;

    Object.keys(params).forEach(key => {
        if(params[key] === '') {
            alert('All inputs must not be empty!');
            return;
        }
    })

    const res = await createNewArticle(localStorage.getItem('user-token'), params);
    if(res.hasOwnProperty('errorData')) {
        notificationEl.textContent = res.message;
        notificationEl.style.background = 'red';
        notificationEl.style.display = 'block';
        registerButton.textContent = 'Submit';
        setTimeout(function () {
            notificationEl.textContent = '';
            notificationEl.style.background = '';
            notificationEl.style.display = 'none';
        }, 3000)
        return;
    }
    console.log(res);
    articlesData.articles.push(res);
    this.redirect('#/');
    notificationEl.textContent = 'Успешно създадохте нов пост!';
    notificationEl.style.display = 'block';

    setTimeout(function () {
        notificationEl.textContent = '';
        notificationEl.style.display = 'none';
    }, 3000);
}