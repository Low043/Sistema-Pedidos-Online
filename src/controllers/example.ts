import type { Request, Response } from 'express';

export default {
    getStatus: (req: Request, res: Response) => {
        res.status(200).json({ status: 'OK' });
    }
}