import { config } from 'dotenv';
import { verifyToken } from '../utils/jwt.js';
import RefreshToken from '../model/schema/refreshToken.schema.js';

config();

const accessTokenValidator = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
    }
    
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedAccessToken = await verifyToken({ token: accessToken, secretOrPublicKey: process.env.ACCESS_TOKEN_SECRET });
    req.decodedAccessToken = decodedAccessToken;
    next();
  } catch (error) {
    console.error('Access token validation error:', error);
    return res.status(401).json({ error: 'Unauthorized: Access token invalid or expired' });
  }
};

const refreshTokenValidator = async (req, res, next) => {
  try {
    const refreshToken = req.headers.authorization.split(' ')[1] || req.body.refreshToken;
    const decodedRefreshToken = await verifyToken({ token: refreshToken, secretOrPublicKey: process.env.REFRESH_TOKEN_SECRET });
    req.decodedRefreshToken = decodedRefreshToken;

    const tokenExists = await RefreshToken.exists({ token: refreshToken });
    if (!tokenExists) {
      throw new Error('Refresh token does not exist');
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export { accessTokenValidator, refreshTokenValidator };
