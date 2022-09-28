import {login, getAllarticles} from '../data.js'

export default async function() {
    this.partials = {
        header: await this.load('../templates/header.hbs'),
        footer: await this.load('../templates/footer.hbs'),
        loginForm: await this.load('../templates/login/loginForm.hbs')
    }

    this.partial('../templates/login/login.hbs', this.app.userData);
}

export async function loginUser() {
    const params = this.params;
    const userData = this.app.userData;
    const articlesData = this.app.articlesData;
    const allArticles = this.app.allArticles;

    const data = {
        login: params.email,
        password: params.password
    }
    const res = await login(data);
    console.log(res)
    userData.loggedIn = true;
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('email', data.login);
    localStorage.setItem('pass', data.password);
    localStorage.setItem('user-token', res['user-token']);
    localStorage.setItem('ownerId', res.ownerId);

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