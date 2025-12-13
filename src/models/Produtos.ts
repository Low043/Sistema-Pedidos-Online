import prisma from '../lib/prisma';

export default class Produtos {
    static async getAll() {
        return await prisma.produto.findMany();
    }
}