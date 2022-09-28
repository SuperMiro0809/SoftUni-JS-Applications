import { deletePostById } from '../data.js';

export default async function () {
    const data = this.app.userData;
    const notificationEl = document.getElementById('notification');

    if (data.loggedIn === true) {
        const id = this.params.id;
        const res = await deletePostById(id, localStorage.getItem('user-token'));
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

        this.redirect('#/');
        notificationEl.textContent = 'Успешно изтрихте пост!';
        notificationEl.style.display = 'block';

        setTimeout(function () {
            notificationEl.textContent = '';
            notificationEl.style.display = 'none';
        }, 3000);
    } else {
        alert('You are not logged in!');
        this.redirect('#/login');
    }
}