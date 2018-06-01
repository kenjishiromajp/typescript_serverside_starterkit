import * as Mongoose from 'mongoose';
import { todoListModel } from '../routes/todolist/model';
import { IDatabase } from './interface';
import { userModel } from '../routes/user/model';

export function start() : IDatabase
{
    Mongoose.connect("mongodb://localhost:27017/todolists");
    return({
        todoListModel,
        userModel
    });
};