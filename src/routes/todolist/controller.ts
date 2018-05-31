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
};