import * as api from './data.js';
import editForm from './edit_form.js';

function main() {
    const loadButt = document.getElementById('loadBooks');
    const submitButton = document.querySelector('form button');
    const tbodyEl = document.querySelector('tbody');

    loadButt.addEventListener('click', load)
    
    async function load() {
        loadButt.textContent = 'Loading...';
        const data = await api.listAllBooks();
        
        tbodyEl.innerHTML = '';

        data.forEach(book => {
            const tr = document.createElement('tr');
            const titleTd = document.createElement('td');
            const authorTd = document.createElement('td');
            const isbnTd = document.createElement('td');
            const buttonsTd = document.createElement('td');
            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            titleTd.textContent = book.Title;
            authorTd.textContent = book.Author;
            isbnTd.textContent = book.Isbn;
            editButton.textContent = 'Edit';
            deleteButton.textContent = 'Delete';

            buttonsTd.appendChild(editButton);
            buttonsTd.appendChild(deleteButton);
            tr.appendChild(titleTd)
            tr.appendChild(authorTd)
            tr.appendChild(isbnTd)
            tr.appendChild(buttonsTd)
            tbodyEl.appendChild(tr);


            editButton.addEventListener('click', function edit(e) {
                const parent = e.target.parentElement.parentElement;
                const [titleTd, authorTd, isdnTd] = Array.from(parent.querySelectorAll('td'));
                const editTr = editForm(titleTd.textContent, authorTd.textContent, isdnTd.textContent);

                tbodyEl.replaceChild(editTr, parent);

                const [confirmButton, cancelButton] = Array.from(editTr.querySelectorAll('button'));

                confirmButton.addEventListener('click', async function () {
                    const [titleInput, authorInput, isbnInput] = Array.from(editTr.querySelectorAll('input'));

                   const info = {
                       'Title': titleInput.value,
                       'Author': authorInput.value,
                       'Isbn': isbnInput.value
                   }

                   confirmButton.textContent = 'Updating...';
                   
                   await api.updateABook(book.objectId, info);

                   const newTr = document.createElement('tr');
                    const titleTd = document.createElement('td');
                    const authorTd = document.createElement('td');
                    const isbnTd = document.createElement('td');
                    const buttonsTd = document.createElement('td');
                    const editButton = document.createElement('button');
                    const deleteButton = document.createElement('button');

                    titleTd.textContent = info.Title;
                    authorTd.textContent = info.Author;
                    isbnTd.textContent = info.Isbn;
                    editButton.textContent = 'Edit';
                    deleteButton.textContent = 'Delete';

                    buttonsTd.appendChild(editButton);
                    editButton.addEventListener('click', edit)
                    buttonsTd.appendChild(deleteButton);
                    
                    newTr.appendChild(titleTd)
                    newTr.appendChild(authorTd)
                    newTr.appendChild(isbnTd)
                    newTr.appendChild(buttonsTd)

                    editButton.addEventListener('click', edit)
                    deleteButton.addEventListener('click', async function onDelete(e) {
                        const parent = e.target.parentElement.parentElement;
                        deleteButton.textContent = 'Deleting...';
                        await api.deleteABook(book.objectId);
                        console.log(data);
                        parent.remove();
                        deleteButton.textContent = 'Delete';
                    });

                   tbodyEl.replaceChild(newTr, editTr);
                   confirmButton.textContent = 'Confirm';
                });

                cancelButton.addEventListener('click', function () {
                    tbodyEl.replaceChild(parent, editTr);
                });
            });
            
            deleteButton.addEventListener('click', async function onDelete(e) {
                const parent = e.target.parentElement.parentElement;
                deleteButton.textContent = 'Deleting...';
                await api.deleteABook(book.objectId);
                console.log(data);
                parent.remove();
                deleteButton.textContent = 'Delete';
            });


        });
        loadButt.textContent = 'LOAD ALL BOOKS';
    }

    submitButton.addEventListener('click', onSubmit)
    
    async function onSubmit(e) {
        e.preventDefault();

        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');
        const isbnInput = document.getElementById('isbn');
        const info = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        }
        if(info.title !== '' && info.author !== '' && info.isbn !== '') {
            const data = {
                'Title': info.title,
                'Author': info.author,
                'Isbn': info.isbn
            }
            submitButton.textContent = 'Submitting...';
            await api.createNewBook(data);
            submitButton.textContent = 'Submit';

            titleInput.value = '';
            authorInput.value = '';
            isbnInput.value = '';
            load();
        }else {
            alert('Inputs must not be empty!');
        }
    }
}

main();