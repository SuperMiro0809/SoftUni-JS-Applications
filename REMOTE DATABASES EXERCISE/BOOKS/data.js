const appId = '6FC157B3-C6C0-1203-FFD3-EEFCD212C500';
const RESTappId = '8A1EA27C-F6D2-4BBA-BE25-807939B19C49';

function formUrl(id) {
    return `https://api.backendless.com/${appId}/${RESTappId}/data/books${id}`;
}

const form = {
    'listAll': '',
    'createNew': '',
    'update': '/',
    'delete': '/'
}

export async function listAllBooks() {
    const data = await (await fetch(formUrl(form.listAll))).json();
    return data;
}

export async function createNewBook(data) {
    const res = await fetch(formUrl(form.createNew), { method: 'POST', body: JSON.stringify(data)} );
    return res;
}

export async function updateABook(id, data) {
    const res = await fetch(formUrl(form.update) + id, { method: 'PUT', body: JSON.stringify(data) });
    return res;
}

export async function deleteABook(id) {
    const res = await fetch(formUrl(form.delete) + id, {method: 'DELETE'});
    return res;
}