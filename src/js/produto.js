const productId = parseInt(window.location.pathname.split('/').pop());
const userId = JSON.parse(sessionStorage.getItem('user')).id;

function buildPage(produto) {
    if (!produto) {
        document.querySelector('.product-container').innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    document.getElementById('product-name').textContent = produto.nome;
    document.getElementById('product-price').textContent = produto.valor;
    document.getElementById('product-description').textContent = produto.descricao;
    document.getElementById('product-img').src = produto.imagemUrl;
}

axios.get('/api/produtos/' + productId).then((response) => {
    buildPage(response.data);
});

const quantityInput = document.getElementById('quantity');

const decrementBtn = document.getElementById('decrement');
decrementBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

const incrementBtn = document.getElementById('increment');
incrementBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
});

const addToCartBtn = document.querySelector('.add-to-cart');
addToCartBtn.addEventListener('click', async () => {
    const quantity = parseInt(quantityInput.value);
    await axios.post(`/api/carrinho/${userId}/add`, { produtoId: productId, quantidade: quantity });
    window.location.href = '/home';
});