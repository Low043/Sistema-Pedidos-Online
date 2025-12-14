import exampleController from '../controllers/example';
import jsonMiddleware from '../middlewares/json';
import logger from '../middlewares/logger';
import Router from '../services/Router';
import CarrinhoRouter from './entities/Carrinho';
import ProdutosRouter from './entities/Produtos';
import PedidosRouter from './entities/Pedidos';
import UserRoutes from './entities/User';
import AuthRouter from './auth';

export default class MainRouter extends Router {
    constructor() {
        super('/api');
        this.applyMiddleware(jsonMiddleware);
        this.applyMiddleware(logger);

        this.get('/status', exampleController.getStatus);
        new CarrinhoRouter(this);
        new ProdutosRouter(this);
        new PedidosRouter(this);
        new UserRoutes(this);
        new AuthRouter(this);
    }
}
