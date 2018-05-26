import * as Hapi from 'hapi';
import * as Mongoose from 'mongoose';
import { server } from './server';

// Pegando os Erros de exceção
process.on('uncaughtException', (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Pegando os Erros de Promises
process.on('unhandledRejection', (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

const start = () =>{
    Mongoose.connect("mongodb://localhost:27017/todolists");
    interface ITodo extends Mongoose.Document{
        mame: string;
        done: boolean;
    }
    interface ITodoList extends Mongoose.Document{
        mame: string;
        todos: ITodo[],
    }
    const todoListSchema = new Mongoose.Schema({
        name: {type: String, required: true},
        todos: [{
            name: { type: String, required: true },
            done: { type: Boolean }
        }]
    });
    const todoListModel = Mongoose.model<ITodoList>("TodoList", todoListSchema, "todoLists");
    server.route({
        path: "/todolists",
        method: "GET",
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const todolists = await todoListModel.find();
            return h.response(todolists).code(200);
        }
    });
    server.start();
}

start();