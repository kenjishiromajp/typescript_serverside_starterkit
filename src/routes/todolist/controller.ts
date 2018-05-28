import { IDatabase } from "../../database/interface";
import * as Hapi from 'hapi';

export class TodoListController {
    private database: IDatabase;
    constructor(database: IDatabase) {
        this.database = database;
    }
    async getTodoLists(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const todolists = await this.database.todoListModel.find();
        return h.response(todolists).code(200);
    }
};