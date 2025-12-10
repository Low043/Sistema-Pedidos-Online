import type { User as UserData } from '../lib/generated/client';
import prisma from '../lib/prisma';

export type { UserData };

export default class User {
    static async getAll() {
        return await prisma.user.findMany();
    }

    static async getById(id: number) {
        return await prisma.user.findUnique({ where: { id: id } });
    }

    static async getAdmins() {
        return await prisma.user.findMany({ where: { isAdmin: true } });
    }

    static async create(data: UserData) {
        try {
            await prisma.user.create({ data });
            return true;
        } catch (error) {
            return false;
        }
    }

    static async update(id: number, data: Partial<UserData>) {
        try {
            await prisma.user.update({ where: { id: id }, data });
            return true;
        } catch (error) {
            return false;
        }
    }

    static async deleteById(id: number) {
        try {
            await prisma.user.delete({ where: { id: id } });
            return true;
        } catch (error) {
            return false;
        }
    }
}
