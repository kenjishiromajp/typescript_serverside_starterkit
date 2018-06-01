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
        handler: todoListController.getTodoLists,
        options: {
            auth: 'jwt',
        }
    });

    server.route({
        path: "/todolists",
        method: "POST",
        handler: todoListController.createTodoList,
        options:{
            auth: 'jwt',
            validate:{
                payload: Validator.validateCreateTodoList,
            },
        }
    });

    server.route({
        path: "/todolists/{id}",
        method: ["PATCH","PUT"],
        handler: todoListController.updateTodoList,
        options:{
            auth: 'jwt',
            validate:{
                payload: Validator.validateUpdateTodoList,
            },
        }
    });

    server.route({
        path: "/todolists/{id}",
        method: "DELETE",
        handler: todoListController.deleteTodoList,
        options:{
            auth: 'jwt',
        }
    });
}