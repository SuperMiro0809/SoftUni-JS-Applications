const applicationId = 'A1FD9F38-9DEF-8618-FF65-9B1D6D94F000';
const restApiKey = '59B91CB5-4603-4C47-A573-C8B1D3C00F9B';


function formUrl(endpoint) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CREATE: 'data/movies',
    GET: 'data/movies',
    GETTEAM: 'data/movies/',
    UPDATETEAM: 'data/movies/',
    DELETE: 'data/movies/',
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

export async function createNewMovie(userToken, data) {
    return (await fetch(formUrl(endpoints.CREATE), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken 
        },
        body: JSON.stringify(data)
    })).json()
}

export async function getMovies() {
    return (await (fetch(formUrl(endpoints.GET)))).json()
}

export async function getMovieById(id) {
    return (await (fetch(formUrl(endpoints.GETTEAM + id)))).json();
}

export async function deleteMovieById(id, token) {
    return await fetch(formUrl(endpoints.DELETE + id), {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })
}

export async function updateMovie(id, data) {
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