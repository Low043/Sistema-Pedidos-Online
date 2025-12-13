import Router from '../services/Router';
import produtosController from '../controllers/Produtos';

export default class ProdutosRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/produtos', fatherRouter);
        this.get('/', produtosController.getProdutos);
    }
}