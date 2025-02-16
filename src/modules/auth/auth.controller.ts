import { NextFunction, Request, Response } from 'express';
import { signInService, signUpService } from './auth.service';
import { success } from '@/types/express/response';

export const signUpController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signUpService(userData);

        res.status(201).json({
            message: 'Successfully signed up',
            data: response.user,
        });
    } catch (error) {
        next(error);
    }
};

export const signInController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signInService(userData);

        success(res, 200, 'success', response);
    } catch (error) {
        next(error);
    }
};
