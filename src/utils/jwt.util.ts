import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export interface TokenPayload {
  userId: string;
}

export const generateToken = (payload: TokenPayload): string => {
  // @ts-ignore - Bypassing TypeScript's strict type checking
  return jwt.sign(
    payload,
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    
    if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
      return { userId: decoded.userId as string };
    }
    
    throw new Error('Invalid token structure');
  } catch (error) {
    throw new Error('Invalid token');
  }
};