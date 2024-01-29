
import Users from '../model/schema/user.schema.js';
import { signToken } from '../utils/jwt.js';

import RefreshToken from '../model/schema/refreshToken.schema.js';
import { hashPassword } from '../utils/crypto.js';
import mongoose from 'mongoose';
class UserService {
  signAccessToken({userId}) {
    return signToken({
      payload: { userId,
      tokenType: 'Access Token',
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN},
    });
  }
  signRefreshToken({userId}) {
    return signToken({
      payload: { userId,
      tokenType: 'Refresh Token',
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN  ,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN},
    });
  }
  signAcessAndRefreshToken({userId}) {
    return Promise.all([
      this.signAccessToken({userId}),
      this.signRefreshToken({userId})
    ])
  }

  
  async login(user_id){
    console.log(user_id)
    const [access_token, refresh_token] = await this.signAcessAndRefreshToken({userId: user_id});
    const userObjectId = new mongoose.Types.ObjectId();
    await RefreshToken.create(
      new RefreshToken({token: refresh_token, user_id:userObjectId})
    )
    return{
      access_token,
      refresh_token
    }
  }
  async signup(payload) {
    try {
      // Tạo _id mới cho Users
      const user_id = new mongoose.Types.ObjectId();
  
      // Tạo Users với _id mới
      const newUser = await Users.create({
        ...payload,
        _id: user_id,
        password: hashPassword(payload.password),
      });
  
      if (!newUser) {
        throw new Error('User creation failed');
      }
  
      // Chuyển _id thành chuỗi để sử dụng cho RefreshToken
      const userIdString = user_id.toString();
  
      // Tiếp tục với việc tạo Access và Refresh tokens
      const [access_token, refresh_token] = await this.signAcessAndRefreshToken({ userId: userIdString });
  
      // Tạo RefreshToken với _id của Users
      const refreshToken = await RefreshToken.create({
        token: refresh_token,
        user_id: userIdString,
      });
  
      if (!refreshToken) {
        throw new Error('RefreshToken creation failed');
      }
  
      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  }   
  async logout(refresh_token){
    console.log(refresh_token)
    try {
        const result = await RefreshToken.deleteOne({ token: refresh_token });
        if (result.deletedCount === 1) {
            console.log('Refresh token deleted successfully.');
            return { message: 'Logout success' };
        } else {
            console.log('Refresh token not found or not deleted.');
            return { message: 'Logout failed: Refresh token not found or not deleted.' };
        }
    } catch (error) {
        console.error('Error deleting refresh token:', error);
        throw new Error('Logout failed: Error deleting refresh token.');
    }
} 
async getUserProfile(userId) {
  console.log(userId)
  try {
      const user = await Users.findOne(
          { _id:new mongoose.Types.ObjectId(userId)  },
          { password: 0 }
      );

      return user;
  } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error in getUserProfile:', error);
      throw new Error('Error fetching user profile');
  }
}
  
  async deleteUserProfile(userId){

  try {
    // Kiểm tra xem người dùng có quyền admin không
   
    const deletedUser = await Users.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw new Error('Error deleting user profile: ' + error.message);
  }
}
  async updateMe(userId, payload){
    if (payload.password) {
      
      payload.password = hashPassword(payload.password);
  }
      const user = await Users.findOneAndUpdate(
        {_id: userId},
        payload,
        {new: true},
        {
          includeResult: true,
          returnDocument: 'after',
          projection: {
            password: 0,
          },
        }
      )
      return user;
  }
}
const userService = new UserService();
export default userService;
