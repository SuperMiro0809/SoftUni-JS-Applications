const applicationId = 'E0F90E2E-BAF8-F5F1-FF8B-6099276FBF00';
const restApiKey = 'BB5CCC42-E11C-4EE3-8218-790EFD5B7087';


function formUrl(endpoint) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CREATE: 'data/ideas',
    GET: 'data/ideas',
    GETTEAM: 'data/ideas/',
    UPDATETEAM: 'data/ideas/',
    DELETE: 'data/ideas/',
    UPDATEUSER: 'users/'
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

export async function createNewIdea(userToken, data) {
    return (await fetch(formUrl(endpoints.CREATE), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken 
        },
        body: JSON.stringify(data)
    })).json()
}

export async function getIdeas() {
    return (await (fetch(formUrl(endpoints.GET)))).json()
}

export async function getIdeaById(id) {
    return (await (fetch(formUrl(endpoints.GETTEAM + id)))).json();
}

export async function deleteIdeaById(id, token) {
    return await fetch(formUrl(endpoints.DELETE + id), {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })
}

export async function updateIdea(id, data) {
    return await fetch(formUrl(endpoints.UPDATETEAM + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
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