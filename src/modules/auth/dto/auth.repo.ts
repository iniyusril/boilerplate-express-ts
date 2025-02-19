import { prismaClient } from '@/modules/prisma/prisma.repo';
import { users } from '@prisma/client';

export const findUserByEmail = async (email: string): Promise<users> => {
    return await prismaClient.users.findFirstOrThrow({
        where: {
            email: email,
            deleted_at: null,
        },
    });
};
