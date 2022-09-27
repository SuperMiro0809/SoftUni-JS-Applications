import * as api from './data.js';

function main() {

    const getAllButton = document.getElementById('allStudents');
    const tbodyEl = document.querySelector('#results tbody');
    const formEl = document.getElementById('form');
    const submitButton = formEl.querySelector('button');

    getAllButton.addEventListener('click', getAll);

    async function getAll() {
        getAllButton.textContent = 'Loading...';
        tbodyEl.innerHTML = '';

        const data = await api.getAllStudents();

        data.sort((a,b) => a.ID - b.ID);

        data.forEach(student => {
            const tr = document.createElement('tr');
            const idTd = document.createElement('td');
            const firstNameTd = document.createElement('td');
            const lastNameTd = document.createElement('td');
            const facultyNumberTd = document.createElement('td');
            const gradeTd = document.createElement('td');
            
            idTd.textContent = student.ID;
            firstNameTd.textContent = student.FirstName;
            lastNameTd.textContent = student.LastName;
            facultyNumberTd.textContent = student.FacultyNumber;
            gradeTd.textContent = student.Grade.toFixed(2);

            tr.appendChild(idTd);
            tr.appendChild(firstNameTd);
            tr.appendChild(lastNameTd);
            tr.appendChild(facultyNumberTd);
            tr.appendChild(gradeTd);

            tbodyEl.appendChild(tr);

            getAllButton.textContent = 'Get All Students';
        });
    }

    submitButton.addEventListener('click', onSubmit);

    async function onSubmit(e) {
        e.preventDefault();

        submitButton.textContent = 'Submitting...';

        const idInput = document.getElementById('id');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const facultyNumberInput = document.getElementById('facultyNumber');
        const gradeInput = document.getElementById('grade');

        const info = {
            id: idInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            facultyNumber: facultyNumberInput.value,
            grade: Number(gradeInput.value).toFixed(2)
        }

        const data = {
            "ID": Number(info.id),
            "FirstName": info.firstName,
            "LastName": info.lastName,
            "FacultyNumber": info.facultyNumber, 
            "Grade": Number(info.grade)
        }

        await api.createNewStudent(data);
        getAll();

        submitButton.textContent = 'Submit';
        idInput.value = '';
        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = ''
    }

    
}

main()