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
    },

    create: async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const newProduto = await Produtos.create(data);
            return res.status(201).json(newProduto);
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao criar produto' });
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const updatedProduto = await Produtos.update(Number(id), data);
            return res.json(updatedProduto);
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao atualizar produto' });
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await Produtos.delete(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao deletar produto' });
        }
    }
}