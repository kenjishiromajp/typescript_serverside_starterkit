import * as Mongoose from 'mongoose';
import { ITodoList } from '../todolist/interface';

export const todoListSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    todos: [{
        name: { type: String, required: true },
        done: { type: Boolean }
    }]
});

export const todoListModel = Mongoose.model<ITodoList>("TodoList", todoListSchema, "todoLists");