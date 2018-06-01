import * as Hapi from 'hapi';
import * as Mongoose from 'mongoose';
import { IDatabase } from '../../database/interface';
import { TodoController } from './controller';
import * as Validator from './validator';

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
        handler: todoController.createTodo,
        options:{
            validate: {
                payload: Validator.validateCreateTodo,
                failAction: (request, h, error) => { throw error; }
            }
        }
    });

    server.route({
        path: "/todos/{id}",
        method: ["PATCH", "PUT"],
        handler: todoController.updateTodo,
        options:{
            // validate: {
            //     payload: Validator.validateTodo,
            //     failAction: (request, h, error) => { throw error; }
            // }
        }
    });
}