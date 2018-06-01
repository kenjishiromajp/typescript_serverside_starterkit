import * as Mongoose from 'mongoose';
import { ITodoList } from '../todolist/interface';

export const todoSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, default: false },
},{
    timestamps: true
})

export const todoListSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    todos: [todoSchema]
},{
    timestamps: true,
});

export const todoListModel = Mongoose.model<ITodoList>("TodoList", todoListSchema, "todoLists");