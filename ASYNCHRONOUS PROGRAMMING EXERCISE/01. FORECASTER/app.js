function attachEvents() {
    const locationEl = document.getElementById('location');
    const submitButt = document.getElementById('submit');
    const forecastEl = document.getElementById('forecast');
    const currentEl = document.getElementById('current');
    const upcomingEl = document.getElementById('upcoming');

    const weatherObj = {
        'Sunny': '&#x2600;', //'☀',
        'Partly sunny': '&#x26C5;', //'⛅', 
        'Overcast': '&#x2601;', //'☁', 
        'Rain': '&#x2614;', //'☂', 
        'Degrees': '&#176;' //'°'

    }

    submitButt.addEventListener('click', function () {
        const location = locationEl.value;
        const url = 'https://judgetests.firebaseio.com/locations.json';

        if(location !== '') {
            fetch(url)
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }else {
                    forecastEl.style.display = 'block';

                    const currSpan = document.createElement('span');
                    currSpan.textContent = 'Error';

                    const upcomingSpan = document.createElement('span');
                    upcomingSpan.textContent = 'Error';

                    currentEl.appendChild(currSpan);
                    upcomingEl.appendChild(upcomingSpan);

                    return;
                    
                }
            })
            .then(data => {
                currentEl.innerHTML = '<div class="label">Current conditions</div>';
                upcomingEl.innerHTML = '<div class="label">Three-day forecast</div>';

                const found = data.find(l => l.name === location);

                if(found !== undefined) {
                    forecastEl.style.display = 'block';

                    currentConditions(found.code);

                    threeDayForecast(found.code);
                }else {
                    forecastEl.style.display = 'block';

                    const currSpan = document.createElement('span');
                    currSpan.textContent = 'Error';

                    const upcomingSpan = document.createElement('span');
                    upcomingSpan.textContent = 'Error';

                    currentEl.appendChild(currSpan);
                    upcomingEl.appendChild(upcomingSpan);

                    return;
                }
            })
        }
    })

    function currentConditions(code) {
        const currUrl = `https://judgetests.firebaseio.com/forecast/today/${code}.json`;

        fetch(currUrl)
        .then(res => res.json())
        .then(data => {

            const forecast = data.forecast;
            const div = document.createElement('div');
            div.className = 'forecast';


            const symbolSpan = document.createElement('span');
            const conditionSpan = document.createElement('span');
            const dataOneSpan = document.createElement('span');
            const dataTwoSpan = document.createElement('span');
            const dataThreeSpan = document.createElement('span');

            symbolSpan.className = 'condition symbol';
            symbolSpan.innerHTML = weatherObj[forecast.condition];
            conditionSpan.className = 'condition';

            dataOneSpan.className = 'forecast-data';
            dataOneSpan.textContent = data.name;

            dataTwoSpan.className = 'forecast-data';
            dataTwoSpan.innerHTML = `${forecast.low}${weatherObj.Degrees}/${forecast.high}${weatherObj.Degrees}`;

            dataThreeSpan.className = 'forecast-data';
            dataThreeSpan.textContent = forecast.condition;
            
            div.appendChild(symbolSpan);

            conditionSpan.appendChild(dataOneSpan)
            conditionSpan.appendChild(dataTwoSpan);
            conditionSpan.appendChild(dataThreeSpan);

            div.appendChild(conditionSpan);

            currentEl.appendChild(div);

        })

    }

    function threeDayForecast(code) {
        const url = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            const forecast = data.forecast;
            const div = document.createElement('div');
            div.className = 'forecast-info';

            forecast.forEach(day => {

                const upcomingSpan = document.createElement('span');
                const dataOneSpan = document.createElement('span');
                const dataTwoSpan = document.createElement('span');
                const dataThreeSpan = document.createElement('span');

                upcomingSpan.className = 'upcoming';
                dataOneSpan.className = 'symbol';
                dataTwoSpan.className = 'forecast-data';
                dataThreeSpan.className = 'forecast-data';

                dataOneSpan.innerHTML = weatherObj[day.condition];
                dataTwoSpan.innerHTML = `${day.low}${weatherObj.Degrees}/${day.high}${weatherObj.Degrees}`;
                dataThreeSpan.textContent = `${day.condition}`;

                upcomingSpan.appendChild(dataOneSpan);
                upcomingSpan.appendChild(dataTwoSpan);
                upcomingSpan.appendChild(dataThreeSpan);

                div.appendChild(upcomingSpan);
            })

            upcomingEl.appendChild(div);
        })
    }
    console.log("TODO...");
}

attachEvents();