const anglerEl = document.getElementsByClassName('angler')[1];
const weightEl = document.getElementsByClassName('weight')[1];
const speciesEl = document.getElementsByClassName('species')[1];
const locationEl = document.getElementsByClassName('location')[1];
const baitEl = document.getElementsByClassName('bait')[1];
const captureTimeEl = document.getElementsByClassName('captureTime')[1];
const cathesEl = document.getElementById('catches');

function attachEvents() {
    const addButton = document.getElementsByClassName('add')[0];
    const loadButton = document.getElementsByClassName('load')[0];

    addButton.addEventListener('click', function () {
        const url = 'https://fisher-game.firebaseio.com/catches.json';
        const dataObj = {
            "angler": anglerEl.value, 
            "weight": weightEl.value, 
            "species": speciesEl.value, 
            "location": locationEl.value, 
            "bait": baitEl.value, 
            "captureTime": captureTimeEl.value
        }

        anglerEl.value = '';
        weightEl.value = '';
        speciesEl.value = '';
        locationEl.value = '';
        baitEl.value = '';
        captureTimeEl.value = '';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataObj)
        })
        .then(res => res.json());

        load();
    });

    loadButton.addEventListener('click', load)
    
    function load() {
        const url = 'https://fisher-game.firebaseio.com/catches.json';

        fetch(url)
        .then(res => res.json())
        .then(data => {
            const keys = Object.keys(data);

            cathesEl.innerHTML = '<div class="catch" data-id="<id-goes-here>"><label>Angler</label><input type="text" class="angler" value="Paulo Amorim" /><hr><label>Weight</label>      <input type="number" class="weight" value="636" /><hr><label>Species</label><input type="text" class="species" value="Atlantic Blue Marlin" /><hr><label>Location</label><input type="text" class="location" value="Vitória, Brazil" /><hr><label>Bait</label><input type="text" class="bait" value="trolled pink" /><hr><label>Capture Time</label><input type="number" class="captureTime" value="80" /><hr><button class="update">Update</button><button class="delete">Delete</button></div>';

            keys.forEach(key => {
                const info = data[key];

                const newCath = document.createElement('div');
                newCath.className = 'catch';
                newCath.setAttribute('data-id', '<id-goes-here>');

                createLabelAndInput('Angler', 'text', 'angler', info.angler, newCath);
                createLabelAndInput('Weight', 'number', 'weight', info.weight, newCath);
                createLabelAndInput('Species', 'text', 'species', info.species, newCath);
                createLabelAndInput('Location', 'text', 'location', info.location, newCath);
                createLabelAndInput('Bait', 'text', 'bait', info.bait, newCath);
                createLabelAndInput('Capture Time', 'number', 'captureTime', info.captureTime, newCath);

                const updateButton = document.createElement('button');
                const deleteButton = document.createElement('button');

                updateButton.textContent = 'Update';
                updateButton.className = 'update';
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete';

                newCath.appendChild(updateButton);
                newCath.appendChild(deleteButton);

                updateButton.addEventListener('click', function onUpdate(e) {
                    const url = `https://fisher-game.firebaseio.com/catches/${key}.json`;

                    const parent = e.target.parentElement;

                    const angler = parent.getElementsByClassName('angler')[0];
                    const weight = parent.getElementsByClassName('weight')[0];
                    const species = parent.getElementsByClassName('species')[0];
                    const location = parent.getElementsByClassName('location')[0];
                    const bait = parent.getElementsByClassName('bait')[0];
                    const captureTime = parent.getElementsByClassName('captureTime')[0];

                    const dataObj = {
                        "angler": angler.value, 
                        "weight": weight.value, 
                        "species": species.value, 
                        "location": location.value, 
                        "bait": bait.value, 
                        "captureTime": captureTime.value
                    }

                    fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify(dataObj)
                    })
                    .then(res => res.json())
                });

                deleteButton.addEventListener('click', function onDelete(e) {
                    const parent = e.target.parentElement;
                    parent.remove();

                    const url = `https://fisher-game.firebaseio.com/catches/${key}.json`;

                    fetch(url, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                });

                cathesEl.appendChild(newCath);
            })
        })
    }


    function createLabelAndInput(labelText, inputType, inputClass, inputValue, el) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const hr = document.createElement('hr');

        label.textContent = labelText;
        input.type = inputType;
        input.className = inputClass;
        input.value = inputValue;

        el.appendChild(label);
        el.appendChild(input);
        el.appendChild(hr);
    }



    console.log('TODO...');
}

attachEvents();

