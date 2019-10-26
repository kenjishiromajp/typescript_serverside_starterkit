import * as Joi from 'joi';

export const validateCreateUser = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const validateLogin = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});