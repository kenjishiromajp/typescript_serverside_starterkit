import * as Joi from 'joi';

export const validateTodo = Joi.object().keys({
    todoList_id: Joi.string().required(),
    name: Joi.string().required()
});