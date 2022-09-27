
(function () {
    const appId = '6FC157B3-C6C0-1203-FFD3-EEFCD212C500';
    const RESTappId = '8A1EA27C-F6D2-4BBA-BE25-807939B19C49';

    function formUrl() {
        return `https://api.backendless.com/${appId}/${RESTappId}/data/furniture`;
    }

    function getTemplate(path) {
        return fetch(`./templates/${path}.hbs`)
        .then(res => res.text())
        .then(data => {
            let template = Handlebars.compile(data);
            return template;
        })
    }

    function getItems() {
        return fetch(formUrl())
        .then(res => res.json())
        .then(data => {
            return data;
        })
    }

    function loadFurnitureWithId(id) {
        return fetch(formUrl() + `/${id}`)
        .then(res => res.json())
        .then(data => {
            return data;
        })
    }

   const app = Sammy('#container', function () {

    this.get('#/', function () {
        const welcomeTemplate = '<h1>Welcome...</h1>';
        this.swap(welcomeTemplate);
        Promise.all([
            getTemplate('home'),
            fetch('./templates/partials/item.hbs').then(res => res.text()),
            getItems()
        ]).then(([template, itemTemplateStr, items]) => { 
            Handlebars.registerPartial('item',itemTemplateStr);
            this.swap(template({items}));
        })
    });

    this.get('#/create', function () {
        Promise.all([
            getTemplate('create-furniture')
        ]).then(([template]) => {
            this.swap(template);

            const parentDiv = document.querySelector('.container');
            const button = parentDiv.querySelector('.btn');

            button.addEventListener('click', function (e) {
                e.preventDefault();
                const inputs = Array.from(parentDiv.querySelectorAll('input')).splice(0, 7);
                console.log(inputs);
                const values = inputs.map(i => i.value);

                values.forEach((v, i) => {
                    if(v === '') {
                        inputs[i].classList.add('is-invalid');
                    }else {
                        inputs[i].classList.remove('is-invalid');
                        inputs[i].classList.add('is-valid');
                    }
                });

                button.textContent = 'Please wait...';
                console.log(values);

                const valueObj = {
                    "Description": values[3],
                    "Price": Number(values[4]),
                    "Image_URL": values[5],
                    "Year": values[2],
                    "Model": values[1],
                    "Make": values[0],
                    "Material": values[6],
                }

                fetch(formUrl(), {
                    method: 'POST',
                    body: JSON.stringify(valueObj)
                })
                .then(res => res.json())
                .then(data => {
                    inputs.forEach(i => {
                        i.value = '';
                    });
                    button.textContent = 'Create';
                })
            })
        })
    });

    this.get('#/profile-page', function () {
        Promise.all([
            getTemplate('profile-page')
        ]).then(([template]) => {
            this.swap(template);
        })
    });

    this.get('#/furniture-details/:objectId', function (context) {
        const id = context.params.objectId;
        
        Promise.all([
            loadFurnitureWithId(id),
            getTemplate('furniture-details')
        ])
        .then(([item, template]) => {
            this.swap(template({item}));
        })
    })

   });

   app.run('#/')
}())