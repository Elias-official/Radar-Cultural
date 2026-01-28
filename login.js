// ===== SISTEMA DE CONTA COM LOCALSTORAGE =====
// localStorage = salva dados no navegador do usuário
// Persiste mesmo após fechar a aba!

document.addEventListener('DOMContentLoaded', function() {
    // Verifica qual página é (login ou cadastro)
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', fazerLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', fazerCadastro);
    }

    // Verifica se usuário já está logado
    verificarLogin();
});

// ===== FUNÇÃO: FAZER CADASTRO =====
function fazerCadastro(event) {
    event.preventDefault(); // Evita que a página recarregue

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const msg = document.getElementById('registerMsg');

    // Validações
    if (username === '') {
        msg.textContent = '❌ Usuário não pode estar vazio!';
        msg.style.color = '#ff6b6b';
        return;
    }

    if (password.length < 6) {
        msg.textContent = '❌ Senha deve ter no mínimo 6 caracteres!';
        msg.style.color = '#ff6b6b';
        return;
    }

    if (password !== password2) {
        msg.textContent = '❌ As senhas não conferem!';
        msg.style.color = '#ff6b6b';
        return;
    }

    // Pega todos os usuários cadastrados
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se usuário já existe
    const usuarioExiste = usuarios.some(u => u.username === username);
    if (usuarioExiste) {
        msg.textContent = '❌ Este usuário já existe!';
        msg.style.color = '#ff6b6b';
        return;
    }

    // Cria novo usuário
    const novoUsuario = {
        username: username,
        password: password // Em produção, NUNCA salve senhas em texto plano!
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    msg.textContent = '✅ Cadastro realizado com sucesso! Redirecionando...';
    msg.style.color = '#51cf66';

    // Redireciona após 2 segundos
    setTimeout(() => {
        window.location.href = 'entrada.html';
    }, 2000);
}

// ===== FUNÇÃO: FAZER LOGIN =====
function fazerLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const msg = document.getElementById('loginMsg');

    // Validações
    if (username === '' || password === '') {
        msg.textContent = '❌ Preencha todos os campos!';
        msg.style.color = '#ff6b6b';
        return;
    }

    // Pega usuários cadastrados
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Procura o usuário
    const usuario = usuarios.find(u => u.username === username && u.password === password);

    if (usuario) {
        // Login bem-sucedido!
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        msg.textContent = '✅ Login realizado! Redirecionando...';
        msg.style.color = '#51cf66';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        msg.textContent = '❌ Usuário ou senha incorretos!';
        msg.style.color = '#ff6b6b';
    }
}

// ===== FUNÇÃO: VERIFICAR LOGIN =====
function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const userDisplay = document.getElementById('userDisplay');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (usuarioLogado && userDisplay) {
        // Usuário está logado
        userDisplay.textContent = `Bem-vindo, ${usuarioLogado.username}! `;
        loginBtn.classList.add('hide');
        signupBtn.classList.add('hide');
        logoutBtn.classList.add('show');
        console.log('Usuário logado: ' + usuarioLogado.username);
    } else if (loginBtn) {
        // Usuário não está logado
        loginBtn.classList.remove('hide');
        signupBtn.classList.remove('hide');
        if (logoutBtn) logoutBtn.classList.remove('show');
    }
}

// ===== FUNÇÃO: FAZER LOGOUT =====
function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// ===== FUNÇÃO: OBTER USUÁRIO LOGADO =====
function obterUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado'));
}