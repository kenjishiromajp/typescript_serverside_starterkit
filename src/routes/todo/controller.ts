import { IDatabase } from "../../database/interface";
import * as Hapi from 'hapi';
import * as Boom from 'boom';
import { ITodo } from "./interface";

export class TodoController {
    private database: IDatabase;
    constructor(database: IDatabase) {
        this.database = database;
    }
    async createTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            const { todoList_id, ...todo } = <ITodo>request.payload;
            let todoList = await this.database.todoListModel
                .findByIdAndUpdate(
                    { _id: todoList_id },
                    { $push: {todos: todo} },
                    { new: true, runValidators: true }
                );
            const todoCreated = todoList.todos[todoList.todos.length-1];
            if(!todoList){
                return Boom.notFound();
            }
            return h.response({
                todoList_id,
                ...todoCreated.toJSON(),
            }).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
    async updateTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            const id = request.params['id'];
            const todo = request.payload;
            const keysToSet = Object.keys(todo).reduce((prev, current)=>{
                return {
                    ...prev,
                    [`todos.$.${current}`] : todo[current],
                };
            },{});

            const todoList = await this.database.todoListModel.findOneAndUpdate(
                { 'todos._id': id },
                { '$set': keysToSet },
                { new: true }
            );
            const newTodo = todoList.todos.find((todo )=> todo._id.toString() === id )
            return h.response(newTodo).code(200);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
};