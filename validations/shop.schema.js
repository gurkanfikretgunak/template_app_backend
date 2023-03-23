const Joi = require('joi');

exports.addShopToFavorites = Joi.object({
    id: Joi.alternatives().try(
            Joi.string().length(24).hex(),
            Joi.binary().length(12)
        ).required(),
});

exports.removeShopFromFavorites = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
});

exports.getServicesByType = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
    type: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
});

exports.searchFromShop = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
    text: Joi.string().required(),
});

exports.searchAll = Joi.object({
    text: Joi.string().required(),
    longitude: Joi.number(),
    latitude: Joi.number(),
});

exports.searchCouponCode = Joi.object({
    sharedBy: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
    text: Joi.string().required(),
});

exports.rateAShop = Joi.object({
    shopId: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
    rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

exports.updateARating = Joi.object({
    ratingId: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
    newRating: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

exports.removeARating = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
});

exports.getShopsByServiceType = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().length(24).hex(),
        Joi.binary().length(12)
    ).required(),
    longitude: Joi.number(),
    latitude: Joi.number(),
    gender: Joi.string(),
    price: Joi.array().min(2).max(2),
});

exports.searchWithFilter = Joi.object({
    text: Joi.string().required(),
    longitude: Joi.number(),
    latitude: Joi.number(),
    gender: Joi.string(),
    price: Joi.array().min(2).max(2),
});