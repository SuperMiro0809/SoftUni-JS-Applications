const applicationId = '17054FB6-CAD3-879C-FFEE-57755E2F7200';
const restApiKey = 'FA92EB13-1E7D-4F26-9EF3-1EA3A53FAD3B';

function formUrl(endpoint) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CREATE: 'data/teams',
    GET: 'data/teams',
    UPDATEUSER: 'users/',
    UPDATETEAM: 'data/teams/',
    GETTEAM: 'data/teams/'
}

export async function registerIn(data) {

   return (await fetch(formUrl(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })).json();
}

export async function loginUser(username, password) {
    return (await fetch(formUrl(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
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

export async function createTeam(userToken, data) {
    return (await fetch(formUrl(endpoints.CREATE), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken 
        },
        body: JSON.stringify(data)
    })).json()
}

export async function updateUser(teamId, userId, userToken, isOnTeam, teamMemberId) {
    return (await fetch(formUrl(endpoints.UPDATEUSER + userId), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken  
        },
        body: JSON.stringify({teamId: teamId, isOnTeam: isOnTeam, teamMemberId: teamId, teamMemberId: teamMemberId || null})
    }))
}

export async function getTeams() {
    return (await (fetch(formUrl(endpoints.GET)))).json()
}


export async function getDetails(id) {
    return (await (fetch(formUrl(endpoints.GET) + '/' + id))).json()
}

export async function updateTeam(id, data) {
    return await fetch(formUrl(endpoints.UPDATETEAM + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify( {members: data} )
    })
}

export async function getTeamById(id) {
    return (await (fetch(formUrl(endpoints.GETTEAM + id)))).json();
}

export async function editTeamById(id, data) {
    return await fetch(formUrl(endpoints.UPDATETEAM + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
}
