import {register, login, getAllarticles} from '../data.js'

export default async function() {
    this.partials = {
        header: await this.load('../templates/header.hbs'),
        footer: await this.load('../templates/footer.hbs'),
        registerForm: await this.load('../templates/register/registerForm.hbs')
    }

    this.partial('../templates/register/register.hbs', this.app.userData);
}

export async function registerUser() {
    const params = this.params;
    const userData = this.app.userData;
    const articlesData = this.app.articlesData;
    const allArticles = this.app.allArticles;

    const data = {
        email: params.email,
        password: params.password
    }
    const loginData = {
        login: params.email,
        password: params.password
    }
    const res = await register(data);
    const result = await login(loginData);

    userData.loggedIn = true;
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('email', data.email);
    localStorage.setItem('pass', data.password);
    localStorage.setItem('user-token', result['user-token']);
    localStorage.setItem('ownerId', result.ownerId);

    //get all stored articles
    // const articles = await getAllarticles();
    
    // articles.forEach(article => {
    //     if(article.category.toLowerCase() === 'JS' || article.category.toLowerCase() === 'javascript') {
    //         articlesData.JSArticle = true;
    //         allArticles.JavaScript.push(article);
    //     }else if(article.category.toLowerCase() === 'c#') {
    //         articlesData.CArticle = true;
    //         allArticles.C.push(article);
    //     }else if(article.category.toLowerCase() === 'java') {
    //         articlesData.JavaAarticle = true;
    //         allArticles.Java.push(article);
    //     }else if(article.category.toLowerCase() === 'python') {
    //         articlesData.PytonArticle = true;
    //         allArticles.Pyton.push(article);
    //     }
    // })

    this.redirect('#/home');
}