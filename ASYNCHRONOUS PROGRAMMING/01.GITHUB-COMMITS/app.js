function loadCommits() {
    const usernameEl = document.getElementById('username');
    const repoEl = document.getElementById('repo');
    const commitsUlEl = document.getElementById('commits');

    const url = `https://api.github.com/repos/${usernameEl.value}/${repoEl.value}/commits`;

    fetch(url)
    .then(res => {
        if(res.status === 200) {
            commitsUlEl.innerHTML = '';
            return res.json();
        }else {
            commitsUlEl.innerHTML = '';
            const errorLi = document.createElement('LI');
            errorLi.textContent = `Error: ${res.status} (${res.statusText})`;

            commitsUlEl.appendChild(errorLi);
            return;
        }
    })
    .then(data => {
        data.forEach(el => {
            const li = document.createElement('LI');
            const content = el.commit;
            li.textContent = `${content.author.name}: ${content.message}`;

            commitsUlEl.appendChild(li);
        });
    })
    // Try it with Fetch API
    console.log('TODO...');
}