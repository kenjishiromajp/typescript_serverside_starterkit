import * as Mongoose from 'mongoose';
import { ITodoList } from '../routes/todolist/interface';

export interface IDatabase {
    todoListModel: Mongoose.Model<ITodoList>;
};