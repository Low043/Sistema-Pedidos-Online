import type { Request, Response, NextFunction } from 'express';

export default function logger(req: Request, res: Response, next: NextFunction) {
    const formattedIp = req.ip.replace('::ffff:', '').replace('::1', '127.0.0.1');
    const timestamp = new Date().toLocaleString();
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log('----------------------------------');
        console.log(`${formattedIp} acessou ${req.originalUrl} com ${req.method} em ${timestamp}`);
        console.log(`Resposta: ${res.statusCode} - Tempo: ${duration}ms`);
        console.log('----------------------------------');
    });

    next();
}