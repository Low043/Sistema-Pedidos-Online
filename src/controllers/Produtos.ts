import type { Request, Response } from 'express';
import Produtos from '../models/Produtos';

export default {
    // EXEMPLO

    // getAllUsers: async (req: Request, res: Response) => {
    //     const users = await User.getAll();
    //     return res.json(users);
    // },

    // createUser: async (req: Request, res: Response) => {
    //     const success = await User.create(req.body);

    //     if (!success) {
    //         return res.status(500).json({ error: 'Falha ao criar usuário' });
    //     }

    //     return res.status(201).json({ message: 'Usuário criado com sucesso' });
    // },

    getProdutos: async (req: Request, res: Response) => {
        const produtos = await Produtos.getAll();
        return res.json(produtos);
    },
}