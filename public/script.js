async function fetchPosts() {
  const res = await fetch('/api/posts', {
    credentials: 'include'
  });

  if (!res.ok) {
    // User is not logged in, redirect
    location.href = '/login.html';
    return;
  }

  const posts = await res.json();
  const container = document.getElementById('posts');
  container.innerHTML = '';

  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="deletePost('${post._id}')">Delete</button>
    `;
    container.appendChild(div);
  });
}

document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ title, content })
  });

  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  fetchPosts();
});

async function deletePost(id) {
  await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  fetchPosts();
}

async function logout() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
  location.href = '/login.html';
}

fetchPosts();
