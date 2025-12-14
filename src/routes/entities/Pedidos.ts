import pedidosController from '../../controllers/entities/Pedidos';
import Router from '../../services/Router';

export default class PedidosRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/pedidos', fatherRouter);
        this.get('/', pedidosController.getAll);
        this.post('/finish/:userId', pedidosController.finishUserOrder);
        this.post('/complete/:orderId', pedidosController.completeOrder);
    }
}