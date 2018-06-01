import * as Mongoose from 'mongoose';
import { ITodoList } from '../todolist/interface';

export const todoSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, default: false }
},{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

export const todoListSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    user_id: { type: String, required: true, default: null },
    todos: [todoSchema]
},{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export const todoListModel = Mongoose.model<ITodoList>("TodoList", todoListSchema, "todoLists");