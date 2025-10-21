// Tasks App - JavaScript principal (versão corrigida)
const STORAGE_USERS = "ta_users_v1";
const STORAGE_SESSION = "ta_session_v1";
const STORAGE_TASKS = "ta_tasks_v1";

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function getUsers() { return JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]"); }
function saveUsers(u) { localStorage.setItem(STORAGE_USERS, JSON.stringify(u)); }
function getTasks() { return JSON.parse(localStorage.getItem(STORAGE_TASKS) || "[]"); }
function saveTasks(t) { localStorage.setItem(STORAGE_TASKS, JSON.stringify(t)); }

function signup(username, email, password) {
  const users = getUsers();
  if (users.find(x => x.email === email)) return { ok: false, msg: "E-mail já cadastrado" };
  users.push({ id: uid(), username, email, password });
  saveUsers(users);
  return { ok: true };
}

function loginLocal(email, password) {
  const users = getUsers();
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return { ok: false, msg: "Usuário ou senha inválidos" };
  localStorage.setItem(STORAGE_SESSION, JSON.stringify({ id: u.id, username: u.username, email: u.email }));
  return { ok: true };
}

function logout() {
  localStorage.removeItem(STORAGE_SESSION);
  window.location = "login.html";
}

function currentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_SESSION) || "null");
}

function createTask(payload) {
  const tasks = getTasks();
  const task = Object.assign({ id: uid(), createdAt: new Date().toISOString(), completed: false }, payload);
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function updateTask(id, changes) {
  const tasks = getTasks();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks[idx] = Object.assign({}, tasks[idx], changes);
  saveTasks(tasks);
  return true;
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
}

function getTaskById(id) {
  return getTasks().find(t => t.id === id) || null;
}

function ensureAuth() {
  const user = currentUser();
  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    window.location = "login.html";
    return false;
  }
  document.querySelectorAll(".js-username").forEach(el => el.textContent = user.username);
  return true;
}

function qs(name) {
  const p = new URLSearchParams(window.location.search);
  return p.get(name);
}

function filterTasks(f) {
  const tasks = getTasks();
  if (f === "concluidas") return tasks.filter(t => t.completed);
  if (f === "pendentes") return tasks.filter(t => !t.completed);
  return tasks;
}

function escapeHtml(s) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderTaskItem(t, done) {
  const checked = done ? "checked" : "";
  return `<div class="flex items-start gap-3 py-2 border-b border-gray-100">
    <div class="pt-1"><input type="checkbox" data-id="${t.id}" ${checked} class="js-toggle-check h-4 w-4" /></div>
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-center flex-wrap gap-1">
        <a href="tarefa.html?id=${t.id}" class="font-medium text-gray-700 truncate">${escapeHtml(t.title)}</a>
        <div class="text-xs text-gray-400 whitespace-nowrap">${t.date || ""} ${t.time || ""}</div>
      </div>
      <div class="text-xs text-gray-400">${t.priority ? ("Prioridade: " + t.priority) : ""}</div>
    </div>
  </div>`;
}

function renderTasksList(selector, filter = "todos") {
  const container = document.querySelector(selector);
  if (!container) return;
  const tasks = filterTasks(filter);
  const completed = tasks.filter(t => t.completed);
  const pending = tasks.filter(t => !t.completed);
  
  container.innerHTML = `
    <div class="mb-4">
      <h3 class="text-sm font-semibold border-l-4 border-gray-300 pl-3 mb-2">CONCLUÍDAS</h3>
      ${completed.length ? completed.map(t => renderTaskItem(t, true)).join("") : "<p class='text-xs text-gray-400'>Nenhuma tarefa concluída</p>"}
    </div>
    <div>
      <h3 class="text-sm font-semibold border-l-4 border-gray-300 pl-3 mb-2">PENDENTES</h3>
      ${pending.length ? pending.map(t => renderTaskItem(t, false)).join("") : "<p class='text-xs text-gray-400'>Nenhuma tarefa pendente</p>"}
    </div>`;
}

function attachListHandlers() {
  document.body.addEventListener("change", function (e) {
    if (e.target.matches(".js-toggle-check")) {
      const id = e.target.dataset.id;
      updateTask(id, { completed: e.target.checked });
      if (document.querySelector("#tasksContainer")) renderTasksList("#tasksContainer", document.querySelector("#filterSelect")?.value || "todos");
    }
  });
  
  document.body.addEventListener("click", function (e) {
    if (e.target.matches(".js-delete-task")) {
      const id = e.target.dataset.id;
      if (confirm("Excluir tarefa?")) {
        deleteTask(id);
        if (document.querySelector("#tasksContainer")) renderTasksList("#tasksContainer", document.querySelector("#filterSelect")?.value || "todos");
      }
    }
  });
}

function renderChartsIfPresent() {
  if (typeof Chart === "undefined") return;
  
  const pie = document.getElementById("pieChart");
  if (pie) {
    const tasks = getTasks();
    const done = tasks.filter(t => t.completed).length;
    const pend = tasks.length - done;
    
    new Chart(pie, {
      type: 'pie',
      data: {
        labels: ['Concluídas', 'Pendentes'],
        datasets: [{
          data: [done, pend],
          backgroundColor: ['#334155', '#94a3b8']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: window.innerWidth < 768 ? 'bottom' : 'right'
          }
        }
      }
    });
  }
  
  const bar = document.getElementById("barChart");
  if (bar) {
    new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'Tarefas',
          data: [3, 5, 2, 6],
          backgroundColor: '#334155'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

// Função para redirecionamento pós-login
function handlePostLoginRedirect() {
  const redirectTo = sessionStorage.getItem('redirectAfterLogin');
  if (redirectTo && redirectTo !== '/login.html') {
    sessionStorage.removeItem('redirectAfterLogin');
    window.location.href = redirectTo;
  } else {
    window.location.href = "tarefas.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  attachListHandlers();
  
  // Logout handlers
  document.querySelectorAll(".js-logout").forEach(b => b.addEventListener("click", logout));
  
  // Signup form
  const signupForm = document.getElementById("form-signup");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = this.username.value.trim();
      const email = this.email.value.trim();
      const password = this.password.value;
      const password2 = this.password2.value;
      const msg = this.querySelector(".js-msg");
      
      if (password !== password2) {
        msg.textContent = "Senhas não conferem";
        return;
      }
      
      const res = signup(username, email, password);
      if (!res.ok) {
        msg.textContent = res.msg;
        return;
      }
      
      loginLocal(email, password);
      window.location = "tarefas.html";
    });
  }
  
  // Login form
  const loginForm = document.getElementById("form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.email.value.trim();
      const password = this.password.value;
      const res = loginLocal(email, password);
      const msg = this.querySelector(".js-msg");
      
      if (!res.ok) {
        msg.textContent = res.msg;
        return;
      }
      
      handlePostLoginRedirect();
    });
  }
  
  // New task form
  const newForm = document.getElementById("form-newtask");
  if (newForm) {
    ensureAuth();
    newForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const payload = {
        title: this.title.value.trim(),
        date: this.date.value,
        time: this.time.value,
        priority: this.priority.value,
        description: this.description.value.trim()
      };
      
      if (!payload.title) {
        alert("Preencha o nome da tarefa");
        return;
      }
      
      createTask(payload);
      window.location = "tarefas.html";
    });
  }
  
  // Edit task form
  const editForm = document.getElementById("form-edit-task");
  if (editForm) {
    ensureAuth();
    const id = qs("id");
    const task = getTaskById(id);
    
    if (!task) {
      alert("Tarefa não encontrada");
      window.location = "tarefas.html";
      return;
    }
    
    editForm.title.value = task.title;
    editForm.date.value = task.date || "";
    editForm.time.value = task.time || "";
    editForm.description.value = task.description || "";
    editForm.priority.value = task.priority || "Baixa";
    
    document.querySelector(".js-task-date").textContent = (new Date(task.createdAt)).toLocaleDateString();
    document.querySelector(".js-task-time").textContent = (new Date(task.createdAt)).toLocaleTimeString().slice(0, 5);
    
    document.querySelector(".js-toggle-completed").addEventListener("change", function (e) {
      updateTask(id, { completed: e.target.checked });
    });
    
    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      updateTask(id, {
        title: this.title.value.trim(),
        date: this.date.value,
        time: this.time.value,
        priority: this.priority.value,
        description: this.description.value.trim()
      });
      window.location = "tarefas.html";
    });
    
    document.querySelector(".js-delete-task").addEventListener("click", function () {
      if (confirm("Excluir tarefa?")) {
        deleteTask(id);
        window.location = "tarefas.html";
      }
    });
  }
  
  // Tarefas page
  if (document.body.classList.contains("page-tarefas")) {
    ensureAuth();
    renderTasksList("#tasksContainer", document.querySelector("#filterSelect")?.value || "todos");
    
    document.querySelector("#filterSelect")?.addEventListener("change", function () {
      renderTasksList("#tasksContainer", this.value);
    });
    
    document.querySelector(".js-add-task")?.addEventListener("click", function () {
      window.location = "nova_tarefa.html";
    });
    
    document.querySelector(".js-percentual")?.addEventListener("click", function () {
      window.location = "percentual.html";
    });
    
    document.querySelectorAll(".js-username").forEach(el => {
      el.textContent = currentUser()?.username || "";
    });
  }
  
  // Percentual page
  if (document.body.classList.contains("page-percentual")) {
    ensureAuth();
    renderChartsIfPresent();
    document.querySelectorAll(".js-username").forEach(el => {
      el.textContent = currentUser()?.username || "";
    });
  }
  
  // Redesenha gráficos quando a janela é redimensionada
  window.addEventListener('resize', function () {
    if (document.body.classList.contains("page-percentual")) {
      renderChartsIfPresent();
    }
  });
});