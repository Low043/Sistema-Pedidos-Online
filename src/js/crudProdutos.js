const overlay = document.getElementById("overlay");
const abrir = document.getElementById("abrirForm");
const fechar = document.getElementById("fechar");

const form = document.getElementById("formPrato");
const opcoes = document.getElementById("opcoes");
const desativados = document.getElementById("desativados");

abrir.addEventListener("click", () => {
    overlay.style.display = "flex";
});

fechar.addEventListener("click", () => {
    overlay.style.display = "none";
});

// salvar prato
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const desc = document.getElementById("desc").value;

    criarCard(nome, preco, desc);

    form.reset();
    overlay.style.display = "none";
});

// --------------------
// FUNÇÃO PARA CRIAR CARD
// --------------------
function criarCard(nome, preco, desc) {
    const card = document.createElement("div");
    card.classList.add("card-prato");

    card.innerHTML = `
        <h3>${nome}</h3>
        <p>${desc}</p>

        <span class="preco">R$ ${preco}</span>

        <div class="acoes">
            <button class="editar">Editar</button>
            <button class="remover">Desativar</button>
        </div>
    `;

    // botão de desativar
    card.querySelector(".remover").addEventListener("click", () => {
        desativarCard(card);
    });

    ativos.appendChild(card);
}

// --------------------
// DESATIVAR CARD
// --------------------
function desativarCard(card) {
    card.classList.add("card-desativado");

    const btn = card.querySelector(".remover");
    btn.textContent = "Ativar";
    btn.classList.add("ativar");

    // remove o evento antigo e adiciona o novo
    btn.replaceWith(btn.cloneNode(true));
    const novoBtn = card.querySelector(".ativar");

    novoBtn.addEventListener("click", () => {
        ativarCard(card);
    });

    desativados.appendChild(card);
}

// --------------------
// ATIVAR CARD
// --------------------
function ativarCard(card) {
    card.classList.remove("card-desativado");

    const btn = card.querySelector(".ativar");
    btn.textContent = "Desativar";
    btn.classList.remove("ativar");
    btn.classList.add("remover");

    // remove e recoloca evento correto
    btn.replaceWith(btn.cloneNode(true));
    const novoBtn = card.querySelector(".remover");

    novoBtn.addEventListener("click", () => {
        desativarCard(card);
    });

    ativos.appendChild(card);
}
