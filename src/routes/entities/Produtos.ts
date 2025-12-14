import produtosController from '../../controllers/entities/Produtos';
import Router from '../../services/Router';

export default class ProdutosRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/produtos', fatherRouter);
        this.get('/', produtosController.getProdutos);
        this.get('/:id', produtosController.getProdutoById);
    }
}