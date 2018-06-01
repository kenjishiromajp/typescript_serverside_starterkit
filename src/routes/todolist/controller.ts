import { IDatabase } from "../../database/interface";
import * as Hapi from 'hapi';
import * as Boom from 'boom';

export class TodoListController {
    private database: IDatabase;
    constructor(database: IDatabase) {
        this.database = database;
    }
    async getTodoLists(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const todolists = await this.database.todoListModel.find();
        return h.response(todolists).code(200);
    }
    async createTodoList(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try{
            const { payload } = request;
            const todolist = await this.database.todoListModel.create(payload);
            return h.response(todolist).code(201);
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
    async updateTodoList(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try{
            const { payload } = request;
            const id = request.params['id'];
            const todolist = await this.database.todoListModel.findByIdAndUpdate(id, 
                { $set: payload },
                { new: true }
            );
            return h.response(todolist).code(200);
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
    async deleteTodoList(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try{
            const id = request.params['id'];
            const todolist = await this.database.todoListModel.findByIdAndRemove(id);
            if(!todolist){
                return Boom.notFound();
            }
            return h.response().code(204);
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
};