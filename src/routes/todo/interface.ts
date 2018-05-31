import * as Mongoose from 'mongoose';

export interface ITodo extends Mongoose.Document{
    _id: Number;
    todoList_id: Number;
    mame: string;
    done: boolean;
}