import express from 'express';
import { loginController, signUpController } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', signUpController);
authRouter.post('/login', loginController);

export default authRouter;
