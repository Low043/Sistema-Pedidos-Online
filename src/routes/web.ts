import webController from '../controllers/web';
import Router from '../services/Router';

export default class WebRouter extends Router {
    constructor() {
        super('/');

        this.get('/', webController.getPage.bind(null, 'login'));
        this.get('/home', webController.getPage.bind(null, 'home'));
        this.get('/carrinho', webController.getPage.bind(null, 'carrinho'));
        this.get('/produto/:id', webController.getPage.bind(null, 'produto'));
        this.get('/admin', webController.getPage.bind(null, 'admin'));
        this.get('/styles/:file', webController.getStyleFile);
        this.get('/assets/:file', webController.getAssetFile);
        this.get('/js/:file', webController.getScriptFile);
    }
}