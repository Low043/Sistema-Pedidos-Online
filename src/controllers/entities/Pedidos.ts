import type { Request, Response } from 'express';
import Pedidos from '../../models/Pedidos';

export default {
    getAll: async (req: Request, res: Response) => {
        const pedidos = await Pedidos.getAll();
        return res.json(pedidos);
    },

    finishUserOrder: async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const pedido = await Pedidos.finishUserOrder(userId);

        if (!pedido) {
            return res.status(400).json({ message: 'Erro ao finalizar pedido' });
        }

        return res.json(pedido);
    },

    completeOrder: async (req: Request, res: Response) => {
        const orderId = Number(req.params.orderId);
        const pedido = await Pedidos.completeOrder(orderId);

        if (!pedido) {
            return res.status(400).json({ message: 'Pedido não encontrado ou já concluído' });
        }

        return res.json(pedido);
    }
}