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
        if(!request.auth.isAuthenticated){
            return Boom.forbidden();
        }
        try {
            const { todoList_id, ...todo } = <ITodo>request.payload;
            const user_id = request.auth.credentials['id'];
            let todoList = await this.database.todoListModel
                .findByIdAndUpdate( 
                    { 
                        _id: todoList_id,
                        user_id,
                    },
                    { $push: {todos: todo} },
                    { new: true, runValidators: true }
                );
            if(!todoList){
                return Boom.notFound();
            }
            const todoCreated = todoList.todos[todoList.todos.length-1];
            return h.response({
                todoList_id,
                ...todoCreated.toJSON(),
            }).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
    async updateTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        if(!request.auth.isAuthenticated){
            return Boom.forbidden();
        }
        try {
            const id = request.params['id'];
            const todo = request.payload;
            const keysToSet = Object.keys(todo).reduce((prev, current)=>{
                return {
                    ...prev,
                    [`todos.$.${current}`] : todo[current],
                };
            },{});

            const user_id = request.auth.credentials['id'];
            const todoList = await this.database.todoListModel.findOneAndUpdate(
                { 
                    'todos._id': id,
                    user_id,
                },
                { '$set': keysToSet },
                { new: true }
            );
            const newTodo = todoList.todos.find((todo )=> todo._id.toString() === id )
            return h.response(newTodo).code(200);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
    async deleteTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        if(!request.auth.isAuthenticated){
            return Boom.forbidden();
        }
        try {
            const id = request.params['id'];
            const user_id = request.auth.credentials['id'];
            const todo = await this.database.todoListModel
                .findOneAndUpdate(
                    { 
                        'todos._id': id,
                        user_id,
                    },
                    { $pull: { todos: { _id: id } } },
                    { new: true }
                );
            if(!todo){
                return Boom.notFound();
            }
            return h.response().code(204);
        } catch (error) {
            console.log(error);
            return Boom.badImplementation(error);
        }
    }
};