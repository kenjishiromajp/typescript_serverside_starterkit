import * as Hapi from 'hapi';
import { server } from './server';

const start = () =>{
    server.route({
        path: "/todolists",
        method: "GET",
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const todolists = [
                {
                    id: 1,
                    name: "Nome X",
                    todos: [
                        {
                            id: 3,
                            name: "Todo 1",
                            done: 1,
                        },
                        {
                            id: 4,
                            name: "Todo 2",
                            done: 0,
                        }
                    ],
                }
            ]
            return h.response(todolists).code(200);
        }
    });
    server.start();
}

start();