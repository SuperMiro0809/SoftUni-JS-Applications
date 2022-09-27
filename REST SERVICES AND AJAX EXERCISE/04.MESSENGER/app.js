function attachEvents() {
    const nameEl = document.getElementById('author');
    const message = document.getElementById('content');
    const submitButt = document.getElementById('submit');
    const refreshButt = document.getElementById('refresh');
    const textarea = document.getElementById('messages');

    submitButt.addEventListener('click', onSubmit);
    refreshButt.addEventListener('click', onRefresh);

    const url = 'http://localhost:8000/messenger';

    function onSubmit() {
        nameElVal = nameEl.value;
        messageVal = message.value;

        let messageObj = {
            author: nameElVal,
            content: messageVal,
        }

        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(messageObj)
        })
        .then(res => res.json())
        .then(data => {
            nameEl.value = '';
            message.value = '';
            console.log(data);
        });
    }

    function onRefresh() {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            textarea.textContent = '';
            for(let key in data) {
                const author = data[key].author;
                const content = data[key].content;

                textarea.textContent += `${author}:${content}\n`;
            }
        })
    }

    console.log('TODO...');
}

attachEvents();