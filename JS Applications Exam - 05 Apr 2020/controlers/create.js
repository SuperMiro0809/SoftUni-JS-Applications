import {createNewArticle} from '../data.js';

export default async function() {
    this.partials = {
        header: await this.load('../templates/header.hbs'),
        footer: await this.load('../templates/footer.hbs'),
        createForm: await this.load('../templates/create/createForm.hbs')
    }
    
    this.partial('../templates/create/create.hbs', this.app.userData);
}

export async function createArticle() {
    const params = this.params;
    const articlesData = this.app.articlesData;
    const allArticles = this.app.allArticles;
    const data = {"creator_email": localStorage.getItem('email')};
    Object.assign(data, params);

    const res = await createNewArticle(localStorage.getItem('user-token'), data);
    console.log(res);

    if(data.category.toLowerCase() === 'JS' || data.category.toLowerCase() === 'javascript') {
        articlesData.JSArticle = true;
        allArticles.JavaScript.push(res);
    }else if(data.category.toLowerCase() === 'c#') {
        articlesData.CArticle = true;
        allArticles.C.push(res);
    }else if(data.category.toLowerCase() === 'java') {
        articlesData.JavaAarticle = true;
        allArticles.Java.push(res);
    }else if(data.category.toLowerCase() === 'pyton') {
        articlesData.PytonArticle = true;
        allArticles.Pyton.push(res);
    }else {
        alert('Invalid category!');
        return;
    }

    this.redirect('#/home');
    console.log(data);
}