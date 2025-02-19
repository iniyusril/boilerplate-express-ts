import { compareSync, hash } from 'bcrypt';
import { generateJWT, verifyJWT } from '@/middlewares/jwt.service';
import { JWT_ACCESS_TOKEN_SECRET } from '@/config';
import { CustomError } from '@/utils/custom-error';
import { LoginRequest, UserRequest } from './dto/auth.dto';
import { prismaClient } from '../prisma/prisma.repo';
import { validateCreateUser, validateLogin } from './auth.validator';
import { findUserByEmail } from './dto/auth.repo';
import jwt from 'jsonwebtoken';

export const signUpService = async (userData: UserRequest) => {
    validateCreateUser(userData);

    const findUser = await findUserByEmail(userData.email);
    if (findUser) {
        throw new CustomError(`Email ${userData.email} already exists`, 409);
    }

    const randomId = (Date.now() + Math.floor(Math.random() * 100)).toString(
        36,
    );
    const username = `${userData.email.split('@')[0]}-${randomId}`;
    const hashedPassword = await hash(userData.password, 10);
    const newUserData = await prismaClient.users.create({
        data: {
            ...userData,
            username: username,
            password: hashedPassword,
        },
    });

    return { user: newUserData };
};

export const signInService = async (userData: LoginRequest) => {
    validateLogin(userData);

    const user = await findUserByEmail(userData.email);

    const validPassword = compareSync(userData.password, user.password);
    if (!validPassword) {
        throw new CustomError('Email or password is invalid', 401);
    }

    const payload = {
        userId: user.id,
    };

    const accessToken = await generateJWT(
        payload,
        JWT_ACCESS_TOKEN_SECRET as string,
    );

    return { user, accessToken };
};

export const validateToken = async (token: string): Promise<jwt.JwtPayload> => {
    const payload = await verifyJWT(token, JWT_ACCESS_TOKEN_SECRET as string);
    return payload;
};
