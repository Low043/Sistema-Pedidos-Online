import exampleController from '../controllers/example';
import Router from '../services/Router';

import UserRoutes from './User';

export default class MainRouter extends Router {
    constructor() {
        super('/api');
        this.get('/status', exampleController.getStatus);

        new UserRoutes(this);
    }
}
