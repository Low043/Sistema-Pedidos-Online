import userController from '../../controllers/entities/User';
import Router from '../../services/Router';

export default class UserRouter extends Router {
    constructor(fatherRouter: Router) {
        super('/user', fatherRouter);
        this.get('/', userController.getAllUsers);
        this.post('/', userController.createUser);
    }
}
