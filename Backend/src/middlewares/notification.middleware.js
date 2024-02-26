import { config } from 'dotenv';
import { verifyToken } from '../utils/jwt.js';
import RefreshToken from '../model/schema/refreshToken.schema.js';

config();

const accessTokenValidator = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedAccessToken = await verifyToken({ token: accessToken, secretOrPublicKey: "anhkiet123" });
    req.decodedAccessToken = decodedAccessToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

const refreshTokenValidator = async (req, res, next) => {
  try {
    const refreshToken = req.headers.authorization.split(' ')[1] || req.body.refreshToken;
    const decodedRefreshToken = await verifyToken({ token: refreshToken, secretOrPublicKey: "anhkiet123" });
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
