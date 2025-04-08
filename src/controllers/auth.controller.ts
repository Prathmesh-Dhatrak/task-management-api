import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as RegisterInput;
      const result = await authService.register(data);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as LoginInput;
      const result = await authService.login(data);

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

export default new AuthController();
