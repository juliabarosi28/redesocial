const API = "http://localhost/redesocial/back/api.php";

// Usuário que está conectado
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

// Alternar entre as telas
function mostrarTela(tela){

    document.getElementById("cadastro").classList.add("escondido");
    document.getElementById("login").classList.add("escondido");
    document.getElementById("feed").classList.add("escondido");

    document.getElementById(tela).classList.remove("escondido");
}

// CADASTRO
document.getElementById("formCadastro").addEventListener("submit", async function(e){

    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        username: document.getElementById("username").value,
        email: document.getElementById("emailCadastro").value,
        senha: document.getElementById("senhaCadastro").value
    };

    try {

        const resposta = await fetch(`${API}?rota=usuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if(!resposta.ok){
            alert(resultado.erro || "Não foi possível realizar o cadastro.");
            return;
        }

        alert("Cadastro realizado com sucesso!");

        this.reset();
        mostrarTela("login");

    } catch(erro){

        alert("Erro ao conectar com o servidor.");
        console.error(erro);
    }
});

// LOGIN
document.getElementById("formLogin").addEventListener("submit", async function(e){

    e.preventDefault();

    const dados = {
        email: document.getElementById("emailLogin").value,
        senha: document.getElementById("senhaLogin").value
    };

    try {

        const resposta = await fetch(`${API}?rota=login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if(!resposta.ok){
            alert(resultado.erro || "E-mail ou senha incorretos.");
            return;
        }

        usuarioLogado = resultado.usuario;

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioLogado)
        );

        this.reset();
        mostrarTela("feed");
        carregarPublicacoes();

    } catch(erro){

        alert("Erro ao conectar com o servidor.");
        console.error(erro);
    }
});

// CARREGAR FEED
async function carregarPublicacoes(){

    try {

        const resposta = await fetch(`${API}?rota=publicacao`);

        if(!resposta.ok){
            throw new Error("Não foi possível carregar as publicações.");
        }

        const publicacoes = await resposta.json();

        const lista = document.getElementById("listaPublicacoes");

        lista.innerHTML = "";

        if(publicacoes.length === 0){
            lista.innerHTML = "<p>Ainda não existem publicações.</p>";
            return;
        }

        publicacoes.forEach(publicacao => {

            const card = document.createElement("div");
            card.className = "publicacao";

            const titulo = document.createElement("h4");
            titulo.textContent = "Usuário #" + publicacao.id_usuario;

            const legenda = document.createElement("p");
            legenda.textContent = publicacao.legenda;

            card.appendChild(titulo);
            card.appendChild(legenda);

            if(publicacao.imagem_url){

                const imagem = document.createElement("img");
                imagem.src = publicacao.imagem_url;
                imagem.alt = "Imagem da publicação";

                card.appendChild(imagem);
            }

            const botaoCurtir = document.createElement("button");
            botaoCurtir.className = "curtir";
            botaoCurtir.textContent = "❤️ Curtir";

            botaoCurtir.addEventListener("click", () => {
                curtirPublicacao(publicacao.id_publicacao);
            });

            card.appendChild(botaoCurtir);
            lista.appendChild(card);

        });

    } catch(erro){

        console.error(erro);

        document.getElementById("listaPublicacoes").textContent =
            "Erro ao carregar as publicações.";
    }
}

// CRIAR PUBLICAÇÃO
document.getElementById("formPublicacao").addEventListener("submit", async function(e){

    e.preventDefault();

    if(!usuarioLogado){
        alert("Faça login primeiro.");
        return;
    }

    const dados = {
        id_usuario: usuarioLogado.id_usuario,
        legenda: document.getElementById("legenda").value,
        imagem_url: document.getElementById("imagemUrl").value
    };

    try {

        const resposta = await fetch(`${API}?rota=publicacao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if(!resposta.ok){
            alert(resultado.erro || "Erro ao criar publicação.");
            return;
        }

        alert("Publicação criada com sucesso!");

        this.reset();
        carregarPublicacoes();

    } catch(erro){

        alert("Erro ao conectar com o servidor.");
        console.error(erro);
    }
});

// CURTIR PUBLICAÇÃO
async function curtirPublicacao(idPublicacao){

    if(!usuarioLogado){
        alert("Faça login primeiro.");
        return;
    }

    try {

        const resposta = await fetch(`${API}?rota=curtida`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_usuario: usuarioLogado.id_usuario,
                id_publicacao: idPublicacao
            })
        });

        const resultado = await resposta.json();

        if(!resposta.ok){
            alert(resultado.erro || "Não foi possível curtir.");
            return;
        }

        alert("Você curtiu esta publicação!");
        carregarPublicacoes();

    } catch(erro){

        alert("Erro ao conectar com o servidor.");
        console.error(erro);
    }
}

// SAIR DA CONTA
function sair(){

    localStorage.removeItem("usuarioLogado");

    usuarioLogado = null;

    mostrarTela("login");
}

// VERIFICAR SE JÁ EXISTE UMA SESSÃO
if(usuarioLogado){

    mostrarTela("feed");
    carregarPublicacoes();

} else {

    mostrarTela("cadastro");
}