import * as Hapi from 'hapi';
import { IDatabase } from '../../database/interface';

export const register = async (server: Hapi.Server, database: IDatabase) => {
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt','jwt',{
        key: 'minha-chave-secreta',
        validate: async (decoded: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const user = await database.userModel.findById(decoded.id);
            return { isValid: !!user };
        },
        verifyOptions: {
            algorithms: ['HS256']
        }
    })
}