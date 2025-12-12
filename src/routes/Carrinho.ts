import Router from '../services/Router';
import carrinhoController from '../controllers/Carrinho';

export default class CarrinhoRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/carrinho', fatherRouter);
        this.get('/:userId', carrinhoController.getCart);
        this.post('/:userId/add', carrinhoController.addItem);
        this.post('/:userId/remove', carrinhoController.removeItem);
    }
}
