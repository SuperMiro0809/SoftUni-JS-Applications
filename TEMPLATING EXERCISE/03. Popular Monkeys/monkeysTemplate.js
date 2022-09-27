(() => {
    // const monkeysEl = document.getElementsByClassName('monkeys')[0];
    const monkeysEl = document.querySelector('.monkeys');

    function init() {
        Promise.all([
            fetch('./monkey.hbs').then(res => res.text()),
            fetch('./monkeys.hbs').then(res => res.text()),
            fetch('./monkeys.js').then(res => res.json())
        ]).then(([monkeyTemplateStr, monkeysTemplateStr, monkeys]) => {
            Handlebars.registerPartial('monkey', monkeyTemplateStr);
            let template = Handlebars.compile(monkeysTemplateStr);

            monkeysEl.innerHTML = template({monkeys});

            monkeysEl.addEventListener('click', function(e) {
                const target = e.target;
                
                if(e.target.tagName === 'BUTTON') {
                    const infoEl = target.nextElementSibling;
                    const displayStyle = infoEl.style.display;

                    if(displayStyle === 'none') {
                        infoEl.style.display = 'block';
                    }else {
                        infoEl.style.display = 'none';
                    }
                }
            })
        })
    }


    init()
    // TODO
})()