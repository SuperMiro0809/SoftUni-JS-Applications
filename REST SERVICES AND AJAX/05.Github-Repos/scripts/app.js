function loadRepos() {
	const username = document.getElementById('username');
	const repos = document.getElementById('repos');
	const lis = Array.from(repos.querySelectorAll('li'));

	const url = `https://api.github.com/users/${username.value}/repos`;

	lis.forEach(li => {
		li.remove();
	})

	fetch(url)
	.then(res => res.json())
	.then(data => {
		data.forEach(el => {
			const newLi = document.createElement('LI');
			const newA = document.createElement('a');
			newA.href = el.html_url;
			newA.innerHTML = el.full_name;

			newLi.appendChild(newA);
			repos.appendChild(newLi);
		});
	});
	console.log("TODO...");
}