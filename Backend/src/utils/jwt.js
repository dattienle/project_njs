import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

// Hàm tạo token
export const signToken = ({payload, privateKey, options = { algorithm: 'HS256'}}) =>{
  return new Promise((resolve, reject) =>{
    jwt.sign(payload, privateKey, options, (err, token) =>{
      if(err){
        reject(err);
      }
      resolve(token);
    })
  })
}
export const verifyToken = ({token, secretOrPublicKey}) =>{
  return new Promise((resolve, reject) =>{
    jwt.verify(token, secretOrPublicKey, (err, decoded) =>{
      if(err){
        reject(err);
      }
 
        resolve(decoded);

      
    })
  })
}