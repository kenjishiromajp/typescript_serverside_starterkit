import * as Mongoose from 'mongoose';
import * as Bcrypt from 'bcryptjs';
import { IUser } from './interface';
import * as UniqueValidator from 'mongoose-unique-validator';

function hashPassword(password: string): string
{
    return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}

export const userSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
userSchema.pre('save',function(next){
    const user = <IUser>this;
    if(user.isModified('password')){
        user.password = hashPassword(user.password);
    }
    return next();
});
userSchema.methods.validatePassword = function( password:  string){
    return Bcrypt.compareSync(password, this.password);
}
userSchema.plugin(UniqueValidator);

export const userModel = Mongoose.model<IUser>("User", userSchema, "users");