(() => {
    const allCatsEl = document.getElementById('allCats');

     function renderCatTemplate() {
         Promise.all([
             fetch('./cat.hbs').then(res => res.text()),
             fetch('./cats.hbs').then(res => res.text())
         ]).then(([catTemplateStr, catsTemplateStr]) => {
            Handlebars.registerPartial('cat',catTemplateStr);
            let template = Handlebars.compile(catsTemplateStr);

            const cats = window.cats;

            allCatsEl.innerHTML = template({cats});

            allCatsEl.addEventListener('click', function(e) {
                const target = e.target;

                if(target.classList.contains('showBtn')) {
                    const statusDivEl = target.nextElementSibling;
                    const displayStyle = statusDivEl.style.display;

                    if(displayStyle === 'none') {
                        statusDivEl.style.display = 'block';
                        target.textContent = 'Hide status code';
                    }else {
                        statusDivEl.style.display = 'none';
                        target.textContent = 'Show status code';
                    }
                }
            })
         })
     }

     renderCatTemplate();
})()
