import prisma from '../lib/prisma';

export default class Carrinho {
    static async getUserCarrinho(userId: number) {
        return await prisma.itemCarrinho.findMany({ where: { userId } });
    }

    static async addItemToCarrinho(userId: number, produtoId: number, quantidade: number) {
        const existingItem = await this.getItem(userId, produtoId);
        if (!existingItem) {
            return this.createItem(userId, produtoId, quantidade);
        }
        
        const newQtd = existingItem.quantidade + quantidade;
        return this.updateItemQtd(existingItem.id, newQtd);
    }

    static async removeItemFromCarrinho(userId: number, produtoId: number, quantidade: number) {
        const existingItem = await this.getItem(userId, produtoId);
        if (!existingItem) return false;

        const newQtd = existingItem.quantidade - quantidade;
        if (newQtd <= 0) {
            return this.deleteItem(existingItem.id);
        }
        
        return this.updateItemQtd(existingItem.id, newQtd);
    }

    private static async getItem(userId: number, produtoId: number) {
        return await prisma.itemCarrinho.findFirst({ where: { userId, produtoId } });
    }

    private static async createItem(userId: number, produtoId: number, quantidade: number) {
        try {
            await prisma.itemCarrinho.create({ data: { userId, produtoId, quantidade } });
        } catch (error) {
            return false;
        }

        return true;
    }

    private static async updateItemQtd(itemId: number, newQtd: number) {
        try {
            await prisma.itemCarrinho.updateMany({ where: { id: itemId }, data: { quantidade: newQtd } });
        } catch (error) {
            return false;
        }

        return true;
    }

    private static async deleteItem(itemId: number) {
        try {
            await prisma.itemCarrinho.deleteMany({ where: { id: itemId } });
        } catch (error) {
            return false;
        }

        return true;
    }
}