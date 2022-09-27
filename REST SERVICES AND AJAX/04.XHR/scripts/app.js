function loadRepos() {
   const res = document.getElementById('res');
   const url = 'https://api.github.com/users/testnakov/repos';

   const xmlHttpRequest = new XMLHttpRequest();
   xmlHttpRequest.addEventListener('readystatechange', function () {
      if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
         res.textContent = xmlHttpRequest.responseText
      }
   });

   xmlHttpRequest.open('GET', url);
   xmlHttpRequest.send();
   console.log("TODO...");
}