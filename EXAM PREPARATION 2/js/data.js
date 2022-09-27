const applicationId = '5B1BE64D-C31C-593E-FF2F-A6513F348400';
const restApiKey = 'A6FAAAFE-37FB-41F0-A3AD-69E299EE9E54';


function formUrl(endpoint) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CREATE: 'data/recipes',
    GET: 'data/recipes',
    GETTEAM: 'data/recipes/',
    UPDATETEAM: 'data/recipes/',
    DELETE: 'data/recipes/'
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

export async function createNewRecipes(userToken, data) {
    return (await fetch(formUrl(endpoints.CREATE), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken 
        },
        body: JSON.stringify(data)
    })).json()
}

export async function getRecipes() {
    return (await (fetch(formUrl(endpoints.GET)))).json()
}

export async function getRecipeById(id) {
    return (await (fetch(formUrl(endpoints.GETTEAM + id)))).json();
}

export async function deleteRecipeById(id, token) {
    return await fetch(formUrl(endpoints.DELETE + id), {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })
}

export async function updateRecipe(id, data) {
    return await fetch(formUrl(endpoints.UPDATETEAM + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
}