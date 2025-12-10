import { Express, Router as ExpressRouter } from 'express';
import type { Handler } from 'express';

export default class Router {
    private expressRouter: ExpressRouter;
    private prefix: string;

    constructor(prefix: string = '/', fatherRouter?: Router) {
        this.expressRouter = ExpressRouter();
        this.prefix = prefix;

        if (fatherRouter) {
            fatherRouter.expressRouter.use(this.expressRouter);
            this.prefix = this.joinPaths(fatherRouter.prefix, prefix);
        }
    }

    public applyRoutesTo(app: Express) {
        app.use(this.expressRouter);
    }

    protected get(endpoint: string, handler: Handler) {
        this.expressRouter.get(this.joinPaths(this.prefix, endpoint), handler);
    }

    protected post(endpoint: string, handler: Handler) {
        this.expressRouter.post(this.joinPaths(this.prefix, endpoint), handler);
    }

    protected put(endpoint: string, handler: Handler) {
        this.expressRouter.put(this.joinPaths(this.prefix, endpoint), handler);
    }

    protected delete(endpoint: string, handler: Handler) {
        this.expressRouter.delete(this.joinPaths(this.prefix, endpoint), handler);
    }

    protected applyMiddleware(middleware: Handler) {
        this.expressRouter.use(middleware);
    }

    private joinPaths(start: string, end: string): string {
        let base = start.endsWith('/') ? start.slice(0, -1) : start;
        let path = end.startsWith('/') ? end : `/${end}`;
        return base + path;
    }
}
