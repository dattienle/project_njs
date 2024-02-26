import { config } from 'dotenv';
import { verifyToken } from '../utils/jwt.js';
import RefreshToken from '../model/schema/refreshToken.schema.js';
import databaseService from '../services/database.services.js';
import Categories from '../model/schema/categories.schema.js';
config();

export const accessTokenValidator = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
    }

    const decodedAccessToken = await verifyToken(accessToken);
    req.decodedAccessToken = decodedAccessToken;
    next();
  } catch (error) {
    console.error('Access token validation error:', error);
    return res.status(401).json({ error: 'Unauthorized: Access token invalid or expired' });
  }
};

export const refreshTokenValidator = async (req, res, next) => {
  try {
    const refreshToken = req.headers.authorization?.split(' ')[1] || req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: 'Unauthorized: Refresh token is missing' });
    }

    const decodedRefreshToken = await verifyToken(refreshToken);
    req.decodedRefreshToken = decodedRefreshToken;

    const tokenExists = await RefreshToken.exists({ token: refreshToken });
    if (!tokenExists) {
      throw new Error('Refresh token does not exist');
    }

    next();
  } catch (error) {
    console.error('Refresh token validation error:', error);
    return res.status(401).json({ error: 'Unauthorized: Refresh token invalid or expired' });
  }
};

export const fetchCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    req.categories = categories;
    next();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



