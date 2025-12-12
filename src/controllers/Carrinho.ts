import type { Request, Response } from 'express';
import Carrinho from '../models/Carrinho';

export default {
    getCart: async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const cartItems = await Carrinho.getUserCarrinho(userId);
        return res.json(cartItems);
    },

    addItem: async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const { produtoId, quantidade } = req.body;

        const success = await Carrinho.addItemToCarrinho(userId, produtoId, quantidade);
        if (!success) {
            return res.status(500).json({ message: 'Falha ao adicionar item ao carrinho' });
        }

        return res.status(200).json({ message: 'Item adicionado ao carrinho' });
    },

    removeItem: async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const { produtoId, quantidade } = req.body;

        const success = await Carrinho.removeItemFromCarrinho(userId, produtoId, quantidade);
        if (!success) {
            return res.status(500).json({ message: 'Falha ao remover item do carrinho' });
        }

        return res.status(200).json({ message: 'Item removido do carrinho' });
    }
}