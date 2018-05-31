//rotas
import * as TodoList from './routes/todolist';
import * as Todo from './routes/todo';

//Configurações
import * as Database from './database';
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
    const database = Database.start();
    TodoList.register(server, database);
    Todo.register(server, database);
    server.start();
}

start();