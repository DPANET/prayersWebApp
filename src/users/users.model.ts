import * as mongoose from 'mongoose';
import {IUser} from './users.interface';
 
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    }
  });
 
export const userModel = mongoose.model<IUser >('User', userSchema,'User');
 
