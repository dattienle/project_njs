import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

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

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(new Error('Invalid token'));
      } else {
        resolve(decoded);
      }
    });
  });
};



// const payload = {
//   userId: '123456789', 
//   username: 'exampleUser', 
// };

// const secretKey = 'anhkiet123';

// const options = {
//   expiresIn: '1h', 
// };

// const token = jwt.sign(payload, secretKey, options);

// console.log(token); 