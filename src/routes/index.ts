import exampleController from '../controllers/example';
import jsonMiddleware from '../middlewares/json';
import logger from '../middlewares/logger';
import Router from '../services/Router';
import UserRoutes from './User';
import ProdutosRouter from './Produtos';
import CarrinhoRouter from './Carrinho';
import AuthRouter from './auth';

export default class MainRouter extends Router {
    constructor() {
        super('/api');
        this.applyMiddleware(jsonMiddleware);
        this.applyMiddleware(logger);

        this.get('/status', exampleController.getStatus);
        new UserRoutes(this);
        new ProdutosRouter(this);
        new CarrinhoRouter(this);
        new AuthRouter(this);
    }
}
