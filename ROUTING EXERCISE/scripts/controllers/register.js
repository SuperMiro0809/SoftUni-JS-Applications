import {registerIn} from '../data.js';

export default async function () {
    console.log(this);
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/register/registerForm.hbs')
    };
    
    this.partial('./templates/register/registerPage.hbs');
}


export async function registerUser() {
    console.log(this)
    const userInfo = this.params;
    const username = userInfo.username;
    const password = userInfo.password;
    const repeatPassword = userInfo.repeatPassword;

    if(password !== repeatPassword) {
        alert('Repeat password does not match password!');
        return;
    }

    if(username === '' || password === '' || repeatPassword === '') {
        alert('All inputs must be field!');
        return;
    }

    const result = await registerIn(userInfo);
    if(result.hasOwnProperty('errorData')) {
        alert(result.message);
        return;
    }
    this.redirect('#/login');
}
