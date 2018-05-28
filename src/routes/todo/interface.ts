import * as Mongoose from 'mongoose';

export interface ITodo extends Mongoose.Document{
    mame: string;
    done: boolean;
}