import { IDatabase } from "../../database/interface";
import * as Hapi from "hapi";
import { IUser } from "./interface";
import * as Boom from "boom";
import * as Mongoose from "mongoose";
import * as Jwt from 'jsonwebtoken';
import { ValidationError } from "mongoose";
import { JWT_SECRET, JWT_EXPIRATION } from "../../plugins/jwt/constants";

export class UserController{
    private database: IDatabase;

    constructor(_database: IDatabase){
        this.database = _database;
    }
    generateHash (user: IUser):string{
        const payload ={
            id: user._id,
            name: user.name,
            email: user.email,
        };
        return Jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION
        });
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
            const user =  await this.database.userModel.findOne({ email: payload.email });
            if(user && user.validatePassword(payload.password)){
                return h.response({
                    token: this.generateHash(user)
                }).code(200);
            }
            return Boom.badRequest();
        }catch(error){
            return Boom.badImplementation(error);
        }
    }
}