import carrinhoController from '../../controllers/entities/Carrinho';
import Router from '../../services/Router';

export default class CarrinhoRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/carrinho', fatherRouter);
        this.get('/:userId', carrinhoController.getCart);
        this.post('/:userId/add', carrinhoController.addItem);
        this.post('/:userId/remove', carrinhoController.removeItem);
    }
}
