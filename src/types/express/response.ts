import { Response } from 'express';

export type ApiResponse = {
    meta: {
        message: string;
        errors?: string[];
    };
    data: any;
};

export const success = (
    res: Response,
    statusCode: number,
    message: string,
    data: any,
): void => {
    const apiResponse: ApiResponse = {
        meta: {
            message: message,
        },
        data: data,
    };

    res.status(statusCode).json(apiResponse);
};
