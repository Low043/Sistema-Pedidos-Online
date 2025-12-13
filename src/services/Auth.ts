import User from '../models/User';

class Auth {
    async login(name: string, password: string) {
        if (!name || !password) throw new Error('Nome e senha são obrigatórios');
        const user = await User.getByName(name);

        if (!user) throw new Error('Usuário não encontrado');
        if (user.password !== password) throw new Error('Senha incorreta');

        return user;
    }

    async register(name: string, password: string) {
        if (!name || !password) throw new Error('Nome e senha são obrigatórios');
        const existingUser = await User.getByName(name);

        if (existingUser) throw new Error('Nome de usuário já está em uso');

        const newUser = await User.create({ name, password });
        if (!newUser) throw new Error('Erro ao criar usuário');

        return newUser;
    }
}

export default new Auth();