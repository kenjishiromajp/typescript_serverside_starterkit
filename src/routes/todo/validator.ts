import * as Joi from 'joi';

export const validateCreateTodo = Joi.object().keys({
    todoList_id: Joi.string().required(),
    name: Joi.string().required()
});

export const validateUpdateTodo = Joi.object().keys({
    name: Joi.string().required()
});