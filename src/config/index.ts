import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production',
    expiresIn: process.env.JWT_EXPIRY || '24h'
  },
  db: {
    url: process.env.DATABASE_URL || ''
  }
};

export default config;
