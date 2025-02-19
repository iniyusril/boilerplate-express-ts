import { users } from '@prisma/client';
import { prismaClient } from '../prisma/prisma.repo';

export const repo = {
    getUserProfile: async (userId: number): Promise<users> => {
        return await prismaClient.users.findUniqueOrThrow({
            where: {
                id: userId,
            },
        });
    },
};
