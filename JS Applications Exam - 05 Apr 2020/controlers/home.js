import {getAllarticles} from '../data.js';

export default async function() {
    this.partials = {
        header: await this.load('../templates/header.hbs'),
        footer: await this.load('../templates/footer.hbs'),
        message: await this.load('../templates/message.hbs')
    }
    const data = this.app.userData;
    const articlesData = this.app.articlesData;
    const allArticles = this.app.allArticles;

    Object.keys(allArticles).forEach(key => {
        allArticles[key] = [];
    })

    const articles = await getAllarticles();
    
    articles.forEach(article => {
        if(article.category.toLowerCase() === 'JS' || article.category.toLowerCase() === 'javascript') {
            articlesData.JSArticle = true;
            allArticles.JavaScript.push(article);
        }else if(article.category.toLowerCase() === 'c#') {
            articlesData.CArticle = true;
            allArticles.C.push(article);
        }else if(article.category.toLowerCase() === 'java') {
            articlesData.JavaAarticle = true;
            allArticles.Java.push(article);
        }else if(article.category.toLowerCase() === 'pyton') {
            articlesData.PytonArticle = true;
            allArticles.Pyton.push(article);
        }
    })

    Object.keys(allArticles).forEach((key,i) => {
        if(allArticles[key].length === 0) {
            if(key === 'JavaScript') {
                articlesData.JSArticle = false;
            }else if(key === 'C') {
                articlesData.CArticle = false;
            }else if(key === 'Java') {
                articlesData.JavaAarticle = false;
            }else if(key === 'Pyton') {
                articlesData.PytonArticle = false;
            }
        }
    })

    Object.assign(data, articlesData);
    Object.assign(data, allArticles);
    this.partial('../templates/home.hbs', data);
}