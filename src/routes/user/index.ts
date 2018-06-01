import * as Hapi from 'hapi';
import * as Validator from './validator';
import { IDatabase } from '../../database/interface';
import { UserController } from './controller';

export function register(
    server: Hapi.Server,
    database: IDatabase,
): void
{
    const userController = new UserController(database);
    server.bind(userController);

    server.route({
        path: "/users",
        method: "POST",
        handler: userController.createUser,
        options: {
            validate:{
                payload: Validator.validateCreateUser
            }
        }
    });

    server.route({
        path: "/login",
        method: "POST",
        handler: userController.login,
        options: {
            validate:{
                payload: Validator.validateLogin
            }
        }
    });

}