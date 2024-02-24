import { checkSchema } from 'express-validator';
import { verifyToken } from '../utils/jwt.js';

export const categoryValidator = checkSchema({
  name: {
    trim: true,
    isLength: {
      errorMessage: 'Name must be at least 2 characters long',
      options: { min: 2 },
    },
  },
});

export const validateCategoryMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await verifyToken({ token, secretOrPublicKey: process.env.JWT_SECRET });
    next();
    
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
