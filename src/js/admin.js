const opacityOverlay = document.querySelector('.opacity');
let produtoId = null;

const closeModalButton = document.querySelector('#close-modal');
closeModalButton.addEventListener('click', () => {
    opacityOverlay.classList.remove('active');
});

const previewImg = document.querySelector('#produto-preview');
const imgUrlInput = document.querySelector('#imgUrl');
imgUrlInput.addEventListener('input', (event) => {
    try {
        if (event.target.value == '' || new URL(event.target.value).protocol.startsWith('http')) {
            previewImg.src = event.target.value;
        }
    } catch {}
});

const precoInput = document.querySelector('#preco');
precoInput.addEventListener('input', (event) => {
     const target = event.target;
    target.value = target.value.replace(/[^0-9,]/g, '');
    const parts = target.value.split(',');

    if (parts.length > 2) {// Impede mais de uma vírgula
        target.value = parts[0] + ',' + parts[1];
    } else if (parts.length === 2) {// Limita a parte decimal a 2 dígitos
        const decimalPart = parts[1].slice(0, 2);
        target.value = parts[0] + ',' + decimalPart;
    } else {// Impede a parte inteira de ter mais dígitos que o permitido
        const integerPart = parts[0].slice(0, 3);
        target.value = integerPart;
    }

    if (target.value.startsWith(',')) {// Impede que o valor comece com vírgula
        target.value = '0' + target.value;
    }
});

const deleteButton = document.querySelector('#delete-produto');
deleteButton.addEventListener('click', async () => {
    const confirmDelete = confirm('Tem certeza que deseja deletar este produto?');
    if (!confirmDelete) return;

    const response = await axios.delete(`/api/produtos/${produtoId}`);
    if (response.status !== 204) {
        alert(response.data.error || 'Erro ao deletar o produto');
        return;
    }

    location.reload();
});

async function createProduto(data) {
    const response = await axios.post('/api/produtos', data);

    if (response.status !== 201) {
        alert(response.data.error || 'Erro ao criar o produto');
        return;
    }

    location.reload();
}

async function updateProduto(id, data) {
    const response = await axios.put(`/api/produtos/${id}`, data);

    if (response.status !== 200) {
        alert(response.data.error || 'Erro ao atualizar o produto');
        return;
    }

    location.reload();
};

const saveButton = document.querySelector('#save-produto');
saveButton.addEventListener('click', async () => {
    const nome = document.querySelector('#nome').value;
    const descricao = document.querySelector('#descricao').value;
    const preco = document.querySelector('#preco').value;
    const imgUrl = document.querySelector('#imgUrl').value;

    if (!nome || !descricao || !preco || !imgUrl) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const url = new URL(imgUrl);
        if (!url.protocol.startsWith('http')) {
            throw new Error('Invalid protocol');
        }
    } catch {
        alert('Por favor, insira uma URL válida para a imagem.');
        return;
    }

    const data = { nome, descricao, valor: parseFloat(preco.replace(',', '.')), imagemUrl: imgUrl };
    if (produtoId) {
        await updateProduto(produtoId, data);
    } else {
        await createProduto(data);
    }
});

const createProdutoButton = document.querySelector('#create-produto');
createProdutoButton.addEventListener('click', () => {
    produtoId = null;
    openEditModal({});
});

function openEditModal(produto) {
    produtoId = produto.id;
    document.querySelector('#nome').value = produto.nome || '';
    document.querySelector('#descricao').value = produto.descricao || '';
    document.querySelector('#preco').value = produto.valor || '';
    document.querySelector('#imgUrl').value = produto.imagemUrl || '';
    document.querySelector('#produto-preview').src = produto.imagemUrl || '';
    opacityOverlay.classList.add('active');
}

function buildPedidosCards(pedidos) {
    const container = document.querySelector('section#pedidos');
    container.innerHTML = '';

    pedidos.forEach((pedido) => {
        if (pedido.concluido) return;

        const card = document.createElement('div');
        card.classList.add('card', 'pedido-card');

        const pedidoInfo = document.createElement('div');
        pedidoInfo.innerHTML = `
            <h3>Pedido #${pedido.id} - Usuário: ${pedido.user.name}</h3>
            <p>Valor Total: R$ ${pedido.valorTotal}</p>
            <p>Status: Pendente</p>
        `;

        const itensList = document.createElement('ul');
        itensList.classList.add('itens-list');
        pedido.itensPedido.forEach((item) => {
            const itemElement = document.createElement('li');
            itemElement.innerHTML = `${item.quantidade} x ${item.produto.nome}`;
            itensList.appendChild(itemElement);
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Marcar como Concluído';
        completeButton.addEventListener('click', async () => {
            await axios.post(`/api/pedidos/complete/${pedido.id}`);
            card.remove();
        });

        card.appendChild(pedidoInfo);
        card.appendChild(itensList);
        card.appendChild(completeButton);
        container.appendChild(card);
    });

    if (container.innerHTML === '') {
        container.innerHTML = '<p>Nenhum pedido pendente.</p>';
    }
}

function buildProdutosCards(produtos) {
    const container = document.querySelector('section#produtos');
    container.innerHTML = '';

    produtos.forEach((produto) => {
        const card = document.createElement('div');
        card.classList.add('card', 'produto-card');

        card.innerHTML = `
            <img src="${produto.imagemUrl}" alt="${produto.nome}" />
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>R$ ${produto.valor}</p>
            <button>Editar</button>
        `;

        const editButton = card.querySelector('button');
        editButton.addEventListener('click', () => openEditModal(produto));

        container.appendChild(card);
    });

    if (container.innerHTML === '') {
        container.innerHTML = '<p>Nenhum produto encontrado.\</p>';
    }
}

axios.get('/api/pedidos').then((response) => buildPedidosCards(response.data));
axios.get('/api/produtos').then((response) => buildProdutosCards(response.data));