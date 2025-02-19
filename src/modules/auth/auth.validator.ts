import { z } from 'zod';
import { LoginRequest, UserRequest } from './dto/auth.dto';

export const validateCreateUser = async (payload: UserRequest) => {
    const validator = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        fullname: z.string(),
    });

    await validator.parseAsync(payload);
};

export const validateLogin = async (payload: LoginRequest) => {
    const validator = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });
    await validator.parseAsync(payload);
};
