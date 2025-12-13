import authController from '../controllers/auth';
import Router from '../services/Router';

export default class AuthRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/auth', fatherRouter);
        this.post('/login', authController.login);
        this.post('/register', authController.register);
    }
}