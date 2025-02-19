import { CustomError } from '@/utils/custom-error';
import { Response } from 'express';
import { ZodError } from 'zod';

export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
};

export type ApiResponse = {
    meta: {
        message: string;
        errors?: string[];
    };
    data: any;
};

export const successResponse = (
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

export const errorResponse = (res: Response, exception: unknown): void => {
    const apiResponse: ApiResponse = {
        meta: {
            message: 'error',
        },
        data: null,
    };
    let statusCode = 500;

    if (exception instanceof ZodError) {
        apiResponse.meta.errors = exception.errors.map(x => x.message);
        apiResponse.meta.message = 'bad_request';
        statusCode = HTTP_STATUS.BAD_REQUEST;
    } else if (exception instanceof CustomError) {
        apiResponse.meta.errors = [exception.message];
        apiResponse.meta.message = 'custom_error';
        statusCode = exception.statusCode || HTTP_STATUS.BAD_REQUEST;
    } else {
        const err = exception as Error;
        apiResponse.meta.errors = [err.message];
        apiResponse.meta.message = 'internal_error';
        statusCode = HTTP_STATUS.BAD_REQUEST;
    }

    res.status(statusCode).json(apiResponse);
};
