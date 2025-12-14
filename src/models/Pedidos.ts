import CarrinhoModel from './Carrinho';
import prisma from '../lib/prisma';

export default class Pedidos {
    static async getAll() {
        return await prisma.pedido.findMany({
            include: {
                user: true,
                itensPedido: { include: { produto: true } },
            }
        });
    }

    static async finishUserOrder(userId: number) {
        const cart = await CarrinhoModel.getUserCarrinho(userId);
        if (cart.length === 0) return false;

        const totalValue = cart.reduce((sum, item) => {
            return sum + Number(item.produto.valor) * item.quantidade;
        }, 0);

        const createItems = cart.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade
        }));

        const pedido = await prisma.pedido.create({
            data: {
                userId,
                valorTotal: totalValue,
                itensPedido: { create: createItems }
            }
        });

        await prisma.itemCarrinho.deleteMany({ where: { userId } });

        return pedido;
    }

    static async completeOrder(orderId: number) {
        const updatedOrder = await prisma.pedido.updateMany({
            where: { id: orderId, concluido: false },
            data: { concluido: true }
        });

        if (updatedOrder.count === 0) {
            return false;
        }

        return true;
    }
}