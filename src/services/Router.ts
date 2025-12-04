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
            this.prefix = path.join(fatherRouter.prefix, prefix);
        }
    }

    public applyRoutesTo(app: Express) {
        app.use(this.expressRouter);
    }

    protected get(endpoint: string, handler: Handler) {
        this.expressRouter.get(this.getFullPath(endpoint), handler);
    }

    protected post(endpoint: string, handler: Handler) {
        this.expressRouter.post(this.getFullPath(endpoint), handler);
    }

    protected put(endpoint: string, handler: Handler) {
        this.expressRouter.put(this.getFullPath(endpoint), handler);
    }

    protected delete(endpoint: string, handler: Handler) {
        this.expressRouter.delete(this.getFullPath(endpoint), handler);
    }

    protected applyMiddleware(middleware: Handler) {
        this.expressRouter.use(middleware);
    }

    private getFullPath(endpoint: string): string {
        return path.join(this.prefix, endpoint);
    }
}
