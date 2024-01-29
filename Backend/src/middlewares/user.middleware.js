
import { checkSchema } from 'express-validator';


import databaseService from '../services/database.services.js';
import { hashPassword } from '../utils/crypto.js';
import Users from '../model/schema/user.schema.js';
import { verifyToken } from '../utils/jwt.js';
import RefreshToken from '../model/schema/refreshToken.schema.js';
const passwordSchema = {
  notEmpty:{
    errorMessage: 'Password is required'
  },
  isString:{
    errorMessage: 'Password must be a string'
  },
  trim: true,
  isLength: {
    errorMessage: 'Password must be at least 6 chars long',
    options: { min: 6 },
  },
  isStrongPassword:{
    options:{
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    errorMessage: 'Password must be at least 6 chars long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol'
  }
}
const confirmPasswordSchema = {
  notEmpty:{
    errorMessage: 'Confirm Password is required'
  },
  isString:{
    errorMessage: 'Confirm Password must be a string'
  },
  trim: true,
  isLength: {
    errorMessage: 'Confirm Password must be at least 6 chars long',
    options: { min: 6 },
  },
  isStrongPassword:{
    options:{
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    errorMessage: 'Confirm Password must be at least 6 chars long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol'
  },
  custom: {
    options: (value, {req}) => {
      if(value !== req.body.password){
        throw new Error('Confirm Password does not match')
      }
      return true;
    }
  }
}
const usernameSchema = {
notEmpty:{
  errorMessage: 'Username is required'
},
isString:{
  errorMessage: 'Username must be a string'
},
trim: true,
isLength: {
  errorMessage: 'Username must be at least 6 chars long',
  options: { min: 6 },
},
}
export const loginValidator = checkSchema({
  email:{
    isEmail: {
      errorMessage: 'Invalid email',
    },
    trim: true,
    custom: {
      options: async (value, {req}) => {
      
        const user = await Users.findOne({email: value,
        password: hashPassword(req.body.password)})
        if(!user){
          throw new Error('Email or Password is incorrect')
        }
        req.user = user;
        return true;
      }
    }
  },
  password: {
    notEmpty:{
      errorMessage: 'Password is required'
    },
    isString:{
      errorMessage: 'Password must be a string'
    },
    trim: true,
    isLength: {
      errorMessage: 'Password must be at least 6 chars long',
      options: { min: 6 },
    },
    isStrongPassword:{
      options:{
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage: 'Password must be at least 6 chars long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol'
    }
    }
  
})

export const registerValidator = checkSchema({
  username: {
    custom: {
      options: (value, { req }) => {
        console.log('Custom validation is running for username');
        if (!value || value.trim().length < 6) {
          throw new Error('Username must be at least 6 chars long');
        }
        return true;
      },
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Invalid email',
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await Users.findOne({ email: value });
        if (user) {
          throw new Error('Email already exists');
        }
        return true;
      },
    },
  },
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  role: {
    custom: {
      options: (value) => {
        if (!['admin', 'user'].includes(value)) {
          throw new Error('Invalid role');
        }
        return true;
      },
    },
  }
});
export const accesTokenValidator = checkSchema({
  Authorization: {
    custom: {
      options: async (value, { req }) => {
      console.log("qua day r")

        const accessToken = (value || '').split(' ')[1];
        if(!accessToken){
          throw new Error('Access token is required')
          
        }
        try {
          const decoded_authorization = await verifyToken({
            token: accessToken,
            secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN,
          });
          req.decodedAuthorization = decoded_authorization;
          console.log(decoded_authorization)
          console.log(req.decodedAuthorization)
          return true;
        } catch (error) {
          throw new Error('Invalid access token');
        }
      },
    },
  },
}, ['headers'])

export const refreshTokenValidator = checkSchema({
  refresh_token: {
    trim: true,
    custom: {
      options: async (value, { req }) => {
       if(!value){
         throw new Error('Refresh token is required')
       }
       try{
        const [decoded_refresh_token, refreshToken] = await Promise.all([
          verifyToken({
            token: value,
            secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN,
          }),
          RefreshToken.findOne({token: value})
        ])
        if(refreshToken == null){
          throw new Error('Used refresh token or not exists')
        }
        req.decodedRefreshToken = decoded_refresh_token;
       }catch(error){
         throw new Error('Invalid refresh token')
       }
      },
    },
  },
},['body'])

export const updateMeValidator= checkSchema({
  username: {
    ...usernameSchema,
    optional: true,
  },
  
  email: {
    isEmail: {
      errorMessage: 'Invalid email',
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await Users.findOne({ email: value });
        if (user) {
          throw new Error('Email already exists');
        }
        return true;
      },
    },
  },
  password: passwordSchema,
  role: {
    custom: {
      options: (value) => {
        if (!['admin', 'user'].includes(value)) {
          throw new Error('Invalid role');
        }
        return true;
      },
    },
  },
  avatar: {
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new Error('Avatar is required');
        }
        return true;
      },
    },
  },
  
  
}, ['body'])
