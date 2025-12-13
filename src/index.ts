import APIRouter from './routes';
import WebRouter from './routes/web';
import express from 'express';

class API {
    private expressInstance: express.Express;
    private apiRouter: APIRouter;
    private webRouter: WebRouter;

    constructor() {
        this.expressInstance = express();
        this.apiRouter = new APIRouter();
        this.webRouter = new WebRouter();

        this.apiRouter.applyRoutesTo(this.expressInstance);
        this.webRouter.applyRoutesTo(this.expressInstance);
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
