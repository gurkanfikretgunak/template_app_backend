const Joi = require('joi');

exports.updateUserInfoSchema = Joi.object({
    name: Joi.string(),
    surname: Joi.string(),
    phoneNumber: Joi.string().min(10).max(10),
});

exports.updatePasswordSchema = Joi.object({
    currentPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    newPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

exports.addAddressSchema = Joi.object({
    address: Joi.object({
        coordinates: Joi.array().min(2).max(2),
        fullAdress: Joi.string(),
        city: Joi.string(),
        country: Joi.string(),
    }),
});

exports.addPaymentCardSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    expirationDate: Joi.date().min(new Date()).required(),
    cardNumber: Joi.string().min(16).max(16).required(),
    title: Joi.string().required(),
});