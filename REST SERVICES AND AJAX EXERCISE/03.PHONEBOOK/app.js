function attachEvents() {
    const loadButtEl = document.getElementById('btnLoad');
    const createButtEl = document.getElementById('btnCreate');

    const phonebookEl = document.getElementById('phonebook');
    const personEl = document.getElementById('person');
    const phoneEl = document.getElementById('phone');

    const url = 'http://localhost:8000/phonebook';

    loadButtEl.addEventListener('click', loadFun);
    createButtEl.addEventListener('click', createFun);

    function loadFun() {

        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            Array.from(phonebookEl.querySelectorAll('li')).forEach(li => {
                li.remove();
            })
            for(let id in data) {
                    const newPhone = document.createElement('LI');
                    const deleteButt = document.createElement('button');
                    deleteButt.textContent = 'Delete';

                    const person = data[id].person;
                    const phone = data[id].phone;
                    
                    deleteButt.addEventListener('click', function () {
                        const deleteUrl = `http://localhost:8000/phonebook/${id}`;

                        fetch(deleteUrl, {
                            method: 'DELETE'
                        })
                        .then(res => res.json())
                        .then(data => {
                            
                            loadFun();  
                        })
                    });

                    newPhone.textContent = `${person}:${phone}`;
                    newPhone.appendChild(deleteButt);

                    phonebookEl.appendChild(newPhone);
                
            }
        })
    }

    function createFun() {
        const  person  = personEl.value;
        const  phone  = phoneEl.value;
        let dataObj = {person, phone};

        fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
        })
        .then(response => response.json())
        .then(data => {

            loadFun();

            personEl.value = '';
            phoneEl.value = '';
        })
    }


    console.log('TODO...');
}

attachEvents();