import { getArticleById, updateArticle } from '../data.js';

export default async function () {
    const data = this.app.userData;
    console.log(data);
    if (data.loggedIn === true && data.isOwner === true) {
        this.partials = {
            header: await this.load('../templates/header.hbs'),
            footer: await this.load('../templates/footer.hbs'),
            editForm: await this.load('../templates/edit/editForm.hbs')
        }
        this.partial('../templates/edit/edit.hbs', this.app.userData);
    }else {
        alert('You are not logged in or you are not the owner of this article!');
        this.redirect('#/login');
        return;
    }
}

export async function editTeam() {
    const id = this.params.objectId;
    const data = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content
    }

    const res = await updateArticle(id, data);

    this.redirect(`#/home/${id}`);
    console.log(res);
}