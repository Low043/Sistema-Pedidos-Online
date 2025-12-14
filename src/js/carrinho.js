const userId = JSON.parse(sessionStorage.getItem('user')).id;

const purchaseButton = document.querySelector('.checkout-button');
const itemsContainer = document.getElementById('cart-items');
const totalPrice = document.getElementById('cart-total-amount');

function renderCart(cart) {
    itemsContainer.innerHTML = '';
    let totalPriceValue = 0;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align: center; margin-top: 20px;">Seu carrinho está vazio.</p>';
        purchaseButton.disabled = true;
    } else {
        purchaseButton.disabled = false;
    }

    cart.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');

        const itemTotal = item.produto.valor * item.quantidade;
        totalPriceValue += itemTotal;

        itemEl.innerHTML = `
            <div class="item-details">
                <img src="${item.produto.imagemUrl}" class="cart-item-img">
                <p>${item.produto.nome} (Qtd: ${item.quantidade})</p>
            </div>
            <div class="item-controls">
                <span>R$ ${itemTotal.toFixed(2)}</span>
                <button class="remove-item-btn"">Remover</button>
            </div>
        `;

        const removeBtn = itemEl.querySelector('.remove-item-btn');
        removeBtn.addEventListener('click', async () => {
            await axios.post(`/api/carrinho/${userId}/remove`, { itemId: item.id, quantidade: item.quantidade });
            renderCart(cart.filter((cartItem) => cartItem.id !== item.id));
        });

        itemsContainer.appendChild(itemEl);
    });


    totalPrice.textContent = `R$ ${totalPriceValue.toFixed(2)}`;
}

axios.get(`/api/carrinho/${userId}`).then((response) => renderCart(response.data));
