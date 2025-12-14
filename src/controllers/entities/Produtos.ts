import type { Request, Response } from 'express';
import Produtos from '../../models/Produtos';

export default {
    getProdutos: async (req: Request, res: Response) => {
        const produtos = await Produtos.getAll();
        return res.json(produtos);
    },

    getProdutoById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const produto = await Produtos.getById(Number(id));
        return res.json(produto);
    }
}