(function () {
    const townInput = document.getElementById('towns');
    const loadButton = document.getElementById('btnLoadTowns');
    const rootEl = document.getElementById('root');

    loadButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (townInput.value !== '') {
            loadButton.textContent = 'Loading...';
            Promise.all([
                fetch('./towns.hbs').then(res => res.text())
            ]).then(([templateStr]) => {
                let template = Handlebars.compile(templateStr);
                const data = townInput.value.split(', ');
                rootEl.innerHTML = template({ towns: data });

                townInput.value = '';
                loadButton.textContent = 'Load';
            });
        }else {
            alert('Input with id towns cannot be empty!');
        }
    })
})()