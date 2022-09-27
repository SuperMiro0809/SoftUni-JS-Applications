const appId = '6FC157B3-C6C0-1203-FFD3-EEFCD212C500';
const RESTappId = '8A1EA27C-F6D2-4BBA-BE25-807939B19C49';

function formUrl() {
    return `https://api.backendless.com/${appId}/${RESTappId}/data/students`;
}

export async function getAllStudents() {
    const data = await (await fetch(formUrl())).json();
    return data;
}

export async function createNewStudent(data) {
    const res = await fetch(formUrl(), { method: 'POST', body: JSON.stringify(data)} );
    return res;
}