import * as Hapi from 'hapi';
import * as Mongoose from 'mongoose';
import { IDatabase } from '../../database/interface';
import { TodoController } from './controller';

export function register(
    server: Hapi.Server,
    database: IDatabase,
):void
{
    const todoController = new TodoController(database);
    server.bind(todoController);

    server.route({
        path: "/todos",
        method: "POST",
        handler: todoController.createTodo
    });
}