import type { Request, Response } from 'express';
import Auth from '../services/Auth';

export default {
    login: async (req: Request, res: Response) => {
        const { name, password } = req.body;

        try {
            const user = await Auth.login(name, password);
            return res.status(200).send({ message: 'Login bem-sucedido', user });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    },

    register: async (req: Request, res: Response) => {
        const { name, password } = req.body;

        try {
            const newUser = await Auth.register(name, password);
            return res.status(201).send({ message: 'Registro bem-sucedido', user: newUser });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}