(function () {
    const appEl = document.getElementById('contacts');
    function init() {
        Promise.all([
            fetch('./contact-card.hbs').then(res => res.text()),
            fetch('./contacts.hbs').then(res => res.text()),
            fetch('./contacts.json').then(res => res.json())
        ]).then(([contactCardTemplateStr, contactsTemplateStr, contacts]) => {
            Handlebars.registerPartial('contact',contactCardTemplateStr);
            let template = Handlebars.compile(contactsTemplateStr);
            appEl.innerHTML = template({contacts});

            appEl.addEventListener('click', function (e) {
                const target = e.target;
                if(target.classList.contains('detailsBtn')) {
                    const parent = target.parentElement;
                    const detailsEl = parent.querySelector('.details');
                    const displayStyle = detailsEl.style.display;
                    
                    if(displayStyle === 'none' || displayStyle === '') {
                        detailsEl.style.display = 'block';
                    }else {
                        detailsEl.style.display = 'none';
                    }
                }
            })
        })
    }

    init()
})();