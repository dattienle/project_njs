import { config } from "dotenv";
import {createHash} from 'crypto';
config();

function sha256(content){
  return createHash('sha256').update(content).digest('hex');
}
export function hashPassword( password){
  return sha256(password + process.env.PASSWORD_SECRET);
}