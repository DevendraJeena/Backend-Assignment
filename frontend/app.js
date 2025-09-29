const API = 'http://localhost:8080/api/v1';
const regMsg = document.getElementById('reg-msg');
const loginMsg = document.getElementById('login-msg');
const dashboard = document.getElementById('dashboard');
const authSection = document.getElementById('auth');

function setToken(token) {
  localStorage.setItem('jwt', token);
}

function getToken() {
  return localStorage.getItem('jwt');
}

function registerUser() {
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  fetch(API + '/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, email, password})
  }).then(r => r.text()).then(t => { regMsg.innerText = t; });
}

function loginUser() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  fetch(API + '/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  }).then(r => {
    if (!r.ok) throw new Error('Login failed');
    return r.json();
  }).then(data => {
    setToken(data.token);
    loginMsg.innerText = 'Logged in';
    authSection.style.display = 'none';
    dashboard.style.display = 'block';
    loadTasks();
  }).catch(e => { loginMsg.innerText = 'Login failed'; });
}

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? ('Bearer ' + token) : ''
  };
}

function loadTasks() {
  fetch(API + '/tasks', { headers: authHeaders() })
    .then(r => r.json())
    .then(list => {
      const container = document.getElementById('tasks');
      container.innerHTML = '';
      list.forEach(t => {
        const div = document.createElement('div');
        div.className = 'task';
        div.innerHTML = `<b>${t.title}</b><p>${t.description || ''}</p>
          <label><input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggle(${t.id}, this.checked)"> Completed</label>
          <button onclick="del(${t.id})">Delete</button>`;
        container.appendChild(div);
      });
    });
}

function createTask() {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  fetch(API + '/tasks', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ title, description })
  }).then(r => r.json()).then(() => { loadTasks(); });
}

function toggle(id, completed) {
  fetch(API + '/tasks/' + id, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ completed })
  }).then(() => loadTasks()).catch(console.error);
}

function del(id) {
  fetch(API + '/tasks/' + id, {
    method: 'DELETE',
    headers: authHeaders()
  }).then(() => loadTasks()).catch(console.error);
}

function logout() {
  localStorage.removeItem('jwt');
  dashboard.style.display = 'none';
  authSection.style.display = 'block';
}
