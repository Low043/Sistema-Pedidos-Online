import type { Prisma } from '../lib/generated/client';
import prisma from '../lib/prisma';

export default class Produtos {
    static async getAll() {
        return await prisma.produto.findMany({ where: { deletado: false } });
    }

    static async getById(id: number) {
        return await prisma.produto.findUnique({ where: { id, deletado: false } });
    }

    static async create(data: Prisma.ProdutoCreateInput) {
        try {
            return await prisma.produto.create({ data });
        } catch (error) {
            throw new Error('Falha ao criar produto');
        }
    }

    static async update(id: number, data: Prisma.ProdutoUpdateInput) {
        try {
            return await prisma.produto.update({ where: { id }, data });
        } catch (error) {
            throw new Error('Falha ao atualizar produto');
        }
    }

    static async delete(id: number) {
        try {
            return await prisma.produto.update({ where: { id }, data: { deletado: true } });
        } catch (error) {
            throw new Error('Falha ao deletar produto');
        }
    }
}