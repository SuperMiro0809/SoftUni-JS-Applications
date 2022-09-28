const applicationId = '332182F0-D44C-07E8-FF59-F3E30CC98F00';
const restApiKey = 'D4AD001A-EC67-4949-BAD8-C83A6F6EF8D5';


function formUrl(endpoint) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CREATE: 'data/treks',
    GET: 'data/treks',
    GETTEAM: 'data/treks/',
    UPDATETEAM: 'data/treks/',
    DELETE: 'data/treks/'
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

export async function getPosts() {
    return (await (fetch(formUrl(endpoints.GET)))).json()
}

export async function getPostById(id) {
    return (await (fetch(formUrl(endpoints.GETTEAM + id)))).json();
}

export async function deletePostById(id, token) {
    return await fetch(formUrl(endpoints.DELETE + id), {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })
}

export async function updatePost(id, data) {
    return await fetch(formUrl(endpoints.UPDATETEAM + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
}