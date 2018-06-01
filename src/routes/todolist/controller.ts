import { IDatabase } from "../../database/interface";
import * as Hapi from 'hapi';
import * as Boom from 'boom';
import { ITodoList } from "./interface";

export class TodoListController {
    private database: IDatabase;
    constructor(database: IDatabase) {
        this.database = database;
    }
    async getTodoLists(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        if(!request.auth.isAuthenticated){
            return Boom.forbidden();
        }
        const user_id = request.auth.credentials['id'];
        const todolists = await this.database.todoListModel.find({
            user_id
        });
        return h.response(todolists).code(200);
    }
    async createTodoList(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        if(!request.auth.isAuthenticated){
            return Boom.forbidden();
        }
        try{
            const payload = <ITodoList>request.payload;
            const user_id = request.auth.credentials['id'];
            const todolist = await this.database.todoListModel.create({
                ...payload,
                user_id,
            });
            return h.response(todolist).code(201);
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
    async updateTodoList(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        if(!request.auth.isAuthenticated){
            return Boom.forbidden();
        }
        try{
            const { payload } = request;
            const id = request.params['id'];
            const user_id = request.auth.credentials['id'];
            const todolist = await this.database.todoListModel.findOne(
                {
                    _id: id,
                    user_id,
                }, 
                { $set: payload },
                { new: true }
            );
            return h.response(todolist).code(200);
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
    async deleteTodoList(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        if(!request.auth.isAuthenticated){
            return Boom.forbidden();
        }
        try{
            const id = request.params['id'];
            const user_id = request.auth.credentials['id'];
            const todolist = await this.database.todoListModel.findOneAndRemove({
                _id: id,
                user_id,
            });
            if(!todolist){
                return Boom.notFound();
            }
            return h.response().code(204);
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
};