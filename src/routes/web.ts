import webController from '../controllers/web';
import Router from '../services/Router';

export default class WebRouter extends Router {
    constructor() {
        super('/');

        this.get('/', webController.getIndexPage);
        this.get('/styles/:file', webController.getStyleFile);
        this.get('/js/:file', webController.getScriptFile);
    }
}