const main = document.querySelector('main');
axios.get('/api/produtos').then((response) => {
    const products = response.data;
    products.forEach((produto) => {
        const productLink = document.createElement('a');
        productLink.href = `/produto/${produto.id}`;

        productLink.innerHTML = `
            <div class="product-card">
                <img src="${produto.imagemUrl}">
                <p>${produto.nome}</p>
            </div>
        `;
        main.appendChild(productLink);
    });
});
