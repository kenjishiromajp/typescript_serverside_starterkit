import * as Mongoose from 'mongoose';
import { ITodo } from '../todo/interface';

export interface ITodoList extends Mongoose.Document{
    mame: string;
    todos: ITodo[],
}