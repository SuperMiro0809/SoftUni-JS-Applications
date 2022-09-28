const applicationId = 'C3BB2B8C-945D-372B-FF6F-6A1B6DCF8700';
const restApiKey = '3F3BF050-D8B8-4D0A-9AD0-181FD342B122';


function formUrl(endpoint) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CREATE: 'data/articles',
    GET: 'data/articles',
    GETTEAM: 'data/articles/',
    UPDATETEAM: 'data/articles/',
    DELETE: 'data/articles/'
}

export async function login(data) {
    return (await fetch(formUrl(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })).json();
}

export async function register(data) {
    return (await fetch(formUrl(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })).json();
}

export function logoutUser(userToken) {
    fetch(formUrl(endpoints.LOGOUT), {
        method: 'GET',
        headers: {
            'user-token': userToken
        }
    })
}

export async function createNewArticle(userToken, data) {
    return (await fetch(formUrl(endpoints.CREATE), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken 
        },
        body: JSON.stringify(data)
    })).json()
}

export async function getAllarticles() {
    return (await (fetch(formUrl(endpoints.GET)))).json()
}

export async function getArticleById(id) {
    return (await (fetch(formUrl(endpoints.GETTEAM + id)))).json();
}

export async function updateArticle(id, data) {
    return await fetch(formUrl(endpoints.UPDATETEAM + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
}

export async function deleteArticle(id, token) {
    return await fetch(formUrl(endpoints.DELETE + id), {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })
}