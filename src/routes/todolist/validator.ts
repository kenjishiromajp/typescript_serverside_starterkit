import * as Joi from 'joi';

export const validateTodoList = Joi.object().keys({
    name: Joi.string().required(),
    todos: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        done: Joi.boolean()
    }))
})