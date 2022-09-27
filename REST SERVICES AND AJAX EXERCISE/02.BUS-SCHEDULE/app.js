function solve() {
    const departButt = document.getElementById('depart');
    const arriveButt = document.getElementById('arrive');
    const infoEl = document.getElementsByClassName('info')[0];
    let currentId = 'depot';
    let stopName = '';

    function depart() {
        arriveButt.disabled = false;
        departButt.disabled = true;

        const url = `https://judgetests.firebaseio.com/schedule/${currentId}.json`;

        fetch(url)
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }else {
                arriveButt.disabled = false;
                departButt.disabled = false; 

                infoEl.textContent = 'Error';
            }
        })
        .then(data => {
            currentId = data.next;
            stopName = data.name;
            infoEl.textContent = `Next stop ${stopName}`;
        })
        console.log('Depart TODO...');
    }

    function arrive() {
        arriveButt.disabled = true;
        departButt.disabled = false;

        infoEl.textContent = `Arriving at ${stopName}`;

        console.log('Arrive TODO...');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();