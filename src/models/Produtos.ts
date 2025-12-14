import prisma from '../lib/prisma';

export default class Produtos {
    static async getAll() {
        return await prisma.produto.findMany();
    }

    static async getById(id: number) {
        return await prisma.produto.findUnique({ where: { id } });
    }
}