import * as Hapi from 'hapi';
import * as Mongoose from 'mongoose';
import { IDatabase } from '../../database/interface';
import { TodoListController } from './controller';

export function register(
    server: Hapi.Server,
    database: IDatabase,
):void
{
    const todoListController = new TodoListController(database);
    server.bind(todoListController);

    server.route({
        path: "/todolists",
        method: "GET",
        handler: todoListController.getTodoLists
    });
}