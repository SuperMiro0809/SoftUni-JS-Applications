function getInfo() {
    const stopID = document.getElementById('stopId');
    const stopNameEl = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    const url = `https://judgetests.firebaseio.com/businfo/${stopID.value}.json`;

    Array.from(buses.querySelectorAll('li')).forEach(li => {
        li.remove();
    });
    stopNameEl.textContent = '';

    fetch(url)
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else {
            stopNameEl.textContent = 'Error';
            return;
        }
    })
    .then(data => {
        if(typeof data === 'undefined') {
            return;
        }
        if(!data.hasOwnProperty('name') || !data.hasOwnProperty('buses')) {
            stopNameEl.textContent = 'Error ';
            return;
        }

        stopNameEl.textContent = data.name;
        for(let bus in data.buses) {
            const newBusLi = document.createElement('LI');
            newBusLi.textContent = `Bus ${bus} arrives in ${data.buses[bus]}`;

            buses.appendChild(newBusLi)
        }
    });

    console.log("TODO...");
}