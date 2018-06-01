import * as Hapi from 'hapi';
import * as Mongoose from 'mongoose';
import { IDatabase } from '../../database/interface';
import { TodoListController } from './controller';
import * as Validator from './validator';

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

    server.route({
        path: "/todolists",
        method: "POST",
        handler: todoListController.createTodoList,
        options:{
            validate:{
                payload: Validator.validateCreateTodoList,
                failAction: (request, h, error) => { throw error; }
            },
        }
    });
}