function attachEvents() {
    const loadPostsButt = document.getElementById('btnLoadPosts');
    const viewPostsButt = document.getElementById('btnViewPost');
    const postsEl = document.getElementById('posts');
    const postTitleEl = document.getElementById('post-title');
    const postBodyEl = document.getElementById('post-body');
    const postCommentsEl = document.getElementById('post-comments');

    const baseUrl = 'https://blog-apps-c12bf.firebaseio.com/';

    loadPostsButt.addEventListener('click', loadPosts);
    viewPostsButt.addEventListener('click', viewPosts);
 
    function loadPosts() {
        const url = baseUrl + 'posts.json';
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const keys = Object.keys(data);
            keys.forEach(key => {
                const option = document.createElement('option');
                const content = data[key]
                option.value = key;
                option.textContent = content.title;

                postsEl.appendChild(option);
            });
        });
    }

    function viewPosts() {

    }

    console.log('TODO...');
}

attachEvents();