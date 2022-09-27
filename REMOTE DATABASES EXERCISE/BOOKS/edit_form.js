export default function createEditForm(tValue, aValue, isbnValue) {
    const tr = document.createElement('tr');
    const titleTd = document.createElement('td');
    const authorTd = document.createElement('td');
    const isbnTd = document.createElement('td');
    const buttonsTd = document.createElement('td');
    const confirmButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    const titleInput = document.createElement('input');
    const authorInput = document.createElement('input');
    const isbnInput = document.createElement('input');

    titleInput.value = tValue;
    authorInput.value = aValue;
    isbnInput.value = isbnValue;

    confirmButton.textContent = 'Confirm';
    cancelButton.textContent = 'Cancel';

    titleTd.appendChild(titleInput);
    authorTd.appendChild(authorInput);
    isbnTd.appendChild(isbnInput);

    buttonsTd.appendChild(confirmButton);
    buttonsTd.appendChild(cancelButton);

    tr.appendChild(titleTd)
    tr.appendChild(authorTd)
    tr.appendChild(isbnInput)
    tr.appendChild(buttonsTd)

    return tr;
}