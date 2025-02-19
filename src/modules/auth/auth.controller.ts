import { Request, Response } from 'express';
import { signInService, signUpService } from './auth.service';
import { errorResponse, successResponse } from '@/types/express/response';
import logger from '@/utils/logger';

export const signUpController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signUpService(userData);

        logger.debug(req.context);
        return successResponse(res, 200, 'success', response);
    } catch (error) {
        return errorResponse(res, error);
    }
};

export const loginController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signInService(userData);

        logger.debug(req.context);
        return successResponse(res, 200, 'success', response);
    } catch (error) {
        return errorResponse(res, error);
    }
};
