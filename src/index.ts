import MainRouter from './routes';
import express from 'express';

class API {
    private expressInstance: express.Express;
    private mainRouter: MainRouter;

    constructor() {
        this.expressInstance = express();
        this.mainRouter = new MainRouter();

        this.mainRouter.applyRoutesTo(this.expressInstance);
        this.expressInstance.set('view engine', 'ejs');
    }

    public listen(port: number) {
        this.expressInstance.listen(port, () => {
            console.log(`API rodando em http://localhost:${port}`);
        });
    }
}

const api = new API();
api.listen(3000);
