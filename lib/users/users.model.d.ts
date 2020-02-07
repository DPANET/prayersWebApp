import * as mongoose from 'mongoose';
import { IUser } from './users.interface';
export declare const userSchema: mongoose.Schema<any>;
export declare const userModel: mongoose.Model<IUser, {}>;
