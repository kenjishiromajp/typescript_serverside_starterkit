import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document{
    name: string;
    email: string;
    password: string;
    validatePassword(password: string):boolean;
}