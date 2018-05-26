import * as Hapi from 'hapi';

export const server = new Hapi.Server({
    port: 8080,
    routes: {
        cors: {
            origin: ["*"]
        }
    }
});