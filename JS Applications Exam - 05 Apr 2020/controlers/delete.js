import { deleteArticle } from '../data.js';

export default async function () {
    const data = this.app.userData;
    console.log(data);
    if (data.loggedIn === true && data.isOwner === true) {;
        const id = this.params.objectId;
        const userToken = localStorage.getItem('user-token');
        const res = await deleteArticle(id, userToken);

        data.isOwner = false;
        this.redirect('#/home');
    }else {
        alert('You are not logged in or you are not the owner of this article!');
        this.redirect('#/login');
        return;
    }
}

// export async function editTeam() {
//     const id = this.params.objectId;
//     const data = {
//         title: this.params.title,
//         category: this.params.category,
//         content: this.params.content
//     }

//     const res = await updateArticle(id, data);

//     this.redirect(`#/home/${id}`);
//     console.log(res);
// }