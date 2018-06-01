import { IDatabase } from "../../database/interface";
import * as Hapi from "hapi";
import { IUser } from "./interface";
import * as Boom from "boom";
import * as Mongoose from "mongoose";
import { ValidationError } from "mongoose";

export class UserController{
    private database: IDatabase;

    constructor(_database: IDatabase){
        this.database = _database;
    }

    async createUser (request: Hapi.Request, h: Hapi.ResponseToolkit){
        try{
            const payload = <IUser>request.payload;
            const userCreated = await this.database.userModel.create(payload);
            return h.response(userCreated).code(201);
        }catch(error){
            if( error.name === 'ValidationError'){
                return Boom.badRequest(error);
            }
            return Boom.badImplementation(error);
        }

    }

    async login (request: Hapi.Request, h: Hapi.ResponseToolkit){
        try{
            const payload = <IUser>request.payload;
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
}