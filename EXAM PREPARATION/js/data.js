const applicationId = 'B3C27DD2-A137-7EFB-FF42-7A3006E39300';
const restApiKey = '378478E9-29FA-4140-B2C9-8FBF3DC1B67C';


function formUrl(endpoint) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    UPDATEUSER: 'users/',
    CREATE: 'data/events',
    GET: 'data/events',
    GETTEAM: 'data/events/',
    UPDATETEAM: 'data/events/',
    DELETE: 'data/events/'
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

export async function getEventById(id) {
    return (await (fetch(formUrl(endpoints.GETTEAM + id)))).json();
}

export async function updateEvent(id, data) {
    return await fetch(formUrl(endpoints.UPDATETEAM + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
}

export async function deleteEvent(id, token) {
    return await fetch(formUrl(endpoints.DELETE + id), {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })
}

export async function updateUser(id, token, body) {
    return await fetch(formUrl(endpoints.UPDATEUSER + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(body)
    })
}