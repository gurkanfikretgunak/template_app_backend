const Joi = require('joi');

exports.registerSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    phoneNumber: Joi.string().min(10).max(10).required(),
    gender: Joi.number().valid(0, 1, 2, 3),
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});