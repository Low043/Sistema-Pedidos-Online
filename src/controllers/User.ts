import type { Request, Response } from 'express';
import User from '../models/User';

export default {
    getAllUsers: async (req: Request, res: Response) => {
        const users = await User.getAll();
        return res.json(users);
    },

    createUser: async (req: Request, res: Response) => {
        const success = await User.create(req.body);

        if (!success) {
            return res.status(500).json({ error: 'Falha ao criar usuário' });
        }

        return res.status(201).json({ message: 'Usuário criado com sucesso' });
    }
}