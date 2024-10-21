// Simulação de usuários cadastrados
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

//Criei para poder apagar os usuarios ja cadastrados(teste)
//localStorage.removeItem('usuarios');

// Função para redirecionar sem abrir nova guia
function navigateTo(url) {
    window.location.href = url; // Muda a URL da página atual
}

// Cadastrar novo usuário
if (document.getElementById('formCadastrar')) {
    document.getElementById('formCadastrar').addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('emailCadastro').value;
        const senha = document.getElementById('senhaCadastro').value;

        // Verifica se o usuário já está cadastrado
        const usuarioExistente = usuarios.find(user => user.email === email);
        if (usuarioExistente) {
            alert('Usuário já cadastrado com este email.');
            return;
        }

        // Adiciona o novo usuário e atualiza o localStorage
        usuarios.push({ nome, email, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Usuário cadastrado com sucesso!');
        navigateTo('../html/logar.html'); // Redireciona para a página de login
    });
}

// Logar usuário
if (document.getElementById('formLogar')) {
    document.getElementById('formLogar').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('emailLogin').value;
        const senha = document.getElementById('senhaLogin').value;

        const usuario = usuarios.find(user => user.email === email && user.senha === senha);

        if (usuario) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            navigateTo('../html/logado.html'); // Redireciona para a página logado
        } else {
            alert('Email ou senha incorretos.');
        }
    });
}

// Exibir nome do usuário logado
if (window.location.pathname.includes('logado.html')) {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        document.getElementById('userWelcome').innerText = `Olá, ${usuarioLogado.nome}!`;
    } else {
        navigateTo('../html/logar.html'); // Redireciona para login se não estiver logado
    }
}

// Função para deslogar
function deslogar() {
    localStorage.removeItem('usuarioLogado');
    navigateTo('../html/logar.html');
}
