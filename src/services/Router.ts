import { Express, Router as ExpressRouter } from 'express';
import type { Handler } from 'express';
import path from 'path';

export default class Router {
    private expressRouter: ExpressRouter;
    private prefix: string;

    constructor(prefix: string = '/', fatherRouter?: Router) {
        this.expressRouter = ExpressRouter();
        this.prefix = prefix;

        if (fatherRouter) {
            fatherRouter.expressRouter.use(this.expressRouter);
        }
    }

    public applyRoutesTo(app: Express) {
        app.use(this.expressRouter);
    }

    public get(endpoint: string, handler: Handler) {
        this.expressRouter.get(this.getFullPath(endpoint), handler);
    }

    public post(endpoint: string, handler: Handler) {
        this.expressRouter.post(this.getFullPath(endpoint), handler);
    }

    public put(endpoint: string, handler: Handler) {
        this.expressRouter.put(this.getFullPath(endpoint), handler);
    }

    public delete(endpoint: string, handler: Handler) {
        this.expressRouter.delete(this.getFullPath(endpoint), handler);
    }

    private getFullPath(endpoint: string): string {
        return path.join(this.prefix, endpoint);
    }
}
