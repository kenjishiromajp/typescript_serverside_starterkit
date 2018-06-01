//rotas
import * as TodoList from './routes/todolist';
import * as Todo from './routes/todo';
import * as User from './routes/user';

//plugins
import * as JwtPlugin from './plugins/jwt';

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

const start = async () =>{
    const database = Database.start();

    //Registrar os plugins antes das rotas
    await JwtPlugin.register(server,database);

    //Registrando as rotas
    TodoList.register(server, database);
    Todo.register(server, database);
    User.register(server, database);

    server.start();
}

start();