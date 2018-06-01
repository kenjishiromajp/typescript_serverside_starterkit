import * as Mongoose from 'mongoose';
import { ITodoList } from '../routes/todolist/interface';
import { IUser } from '../routes/user/interface';

export interface IDatabase {
    todoListModel: Mongoose.Model<ITodoList>;
    userModel: Mongoose.Model<IUser>;
};