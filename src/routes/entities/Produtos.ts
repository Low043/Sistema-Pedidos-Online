import produtosController from '../../controllers/entities/Produtos';
import Router from '../../services/Router';

export default class ProdutosRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/produtos', fatherRouter);
        this.get('/', produtosController.getProdutos);
        this.get('/:id', produtosController.getProdutoById);
        this.post('/', produtosController.create);
        this.put('/:id', produtosController.update);
        this.delete('/:id', produtosController.delete);
    }
}