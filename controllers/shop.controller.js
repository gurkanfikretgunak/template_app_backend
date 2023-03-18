// UTILS / HELPERS / SERVICES
const APIError = require('../services/error.js');
const apiResponse = require('../utils/apiResponse');

// MODELS
const User = require('../models/user.model');
const Shop = require('../models/shop.model');
const OfferedService = require('../models/offeredService.model');
const ServicePackage = require('../models/servicePackage.model');
const Coupon = require('../models/coupon.model');
const Rating = require('../models/rating.model');
const ServiceType = require('../models/serviceType.model');

const shopController = {};

shopController.addShopToFavorites = async (req, res, next) => {
    try {
      const data = {
        _id: req.params.id,
      };

      const shop = await Shop.findOne(data)
      if(!shop) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id');

      const user = await User.findByIdAndUpdate(
        req.payload._id, 
        {$push: {favoriteShops: data._id}}, 
        {new: true, useFindAndModify: false}
      );
      if(!user) return apiResponse.serverErrorResponse(res, 'Unable to add shop to favorites');

      const responseData = {
        favoritedShops: user.toJSON().favoriteShops,
      };

      return apiResponse.successResponse(res, 'Successfully added shop to favorites', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

shopController.removeShopFromFavorites = async (req, res, next) => {
    try {
      const data = {
        _id: req.params.id,
      };

      const shop = await Shop.findOne(data)
      if(!shop) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id');

      const user = await User.findByIdAndUpdate(
        req.payload._id, 
        {$pull: {favoriteShops: data._id}}, 
        {new: true, useFindAndModify: false}
      );
      if(!user) return apiResponse.serverErrorResponse(res, 'Unable to remove shop from favorites');

      const responseData = {
        favoritedShops: user.toJSON().favoriteShops,
      };

      return apiResponse.successResponse(res, 'Successfully removed shop from favorites', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

shopController.getShopDetails = async (req, res, next) => {
  try {
    const data = {
      _id: req.params.id,
      userId: req.payload._id,
    };

    // shop details
    const shop = await Shop.findOne({_id: data._id});
    if(!shop) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id');

    // coupons
    const coupons = await Coupon.find({sharedBy: data._id});
    if(!coupons && coupons != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch coupons');

    // recommended services
    const recommends = await OfferedService.find({provider: data._id}).limit(5).sort({createdAt: -1});
    if(!recommends && recommends != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch service recommendations');

    // offered packages
    const packages = await ServicePackage.find({provider: data._id}).sort({createdAt: -1});
    if(!packages && packages != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch service packages');

    // if the user favorited this shop
    var isFavorited = false;
    const user = await User.findOne({_id: data.userId});
    if(user.favoriteShops.includes(data._id)) isFavorited = true;

    // whether the user has already rated the shop
    const rating = await Rating.findOne({raterId: data.userId, ratedShop: data._id});
    var userRating = rating? rating : false;

    const responseData = {
      shop: shop.toJSON(),
      coupons: coupons,
      recommends: recommends,
      packages: packages,
      isFavorited: isFavorited,
      userRating: userRating,
    };

    return apiResponse.successResponse(res, 'Successfully fetched shop details', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.getServicesByType = async (req, res, next) => {
  try {
    const data = {
      provider: req.body.id,
      type: req.body.type,
    };

    const services = await OfferedService.find(data).sort({createdAt: -1});
    if(!services && services != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch services');

    const responseData = {
      services: services,
    };

    return apiResponse.successResponse(res, 'Successfully fetched services', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.searchFromShop = async (req, res, next) => {
  try {
    const data = {
      provider: req.body.id,
      text: req.body.text,
    };

    // const shop = await Shop.findById(data.provider);
    // if(!shop) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id');

    const searchWords = data.text.trim().split(/\s+/);
    const query = {
      $and: [
        {provider: data.provider},
        ...searchWords.map(word => ({
          $or: [
            {name: {$regex: new RegExp(word, 'i')}},
          ]
        }))
      ]
    };
    
    const services = await OfferedService.find(query).sort({createdAt: -1});
    if(!services && services != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch services');

    const responseData = {
      services: services,
    };

    return apiResponse.successResponse(res, 'Successfully fetched services', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.getShopCoupons = async (req, res, next) => {
  try {
    const data = {
      _id: req.params.id,
    };

    const coupons = await Coupon.find({sharedBy: data._id});
    if(!coupons && coupons != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch coupons');

    const responseData = {
      coupons: coupons,
    };

    return apiResponse.successResponse(res, 'Successfully fetched services', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.searchCouponCode = async (req, res, next) => {
  try {
    const data = {
      text: req.body.text,
      sharedBy: req.body.sharedBy,
    };

    const coupon = await Coupon.findOne({couponName: data.text, sharedBy: data.sharedBy});
    if(!coupon) return apiResponse.notFoundResponse(res, 'Could not find a coupon with the given text');

    const responseData = {
      coupon: coupon.toJSON(),
    };

    return apiResponse.successResponse(res, 'Successfully fetched the coupon', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.rateAShop = async (req, res, next) => {
  try {
    const data = {
      shopId: req.body.shopId,
      rating: req.body.rating,
      userId: req.payload._id
    };

    const rating = await Rating.findOne({raterId: data.userId, ratedShop: data.shopId});
    if(rating) return apiResponse.alreadyExistsResponse(res, 'A record with this id already exists');

    const shop = await Shop.findOne({_id: data.shopId});
    if(!shop) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id');

    const newAverage = (shop.averageRating * shop.numRates + data.rating) / (shop.numRates + 1);
    const updatedShop = await Shop.findByIdAndUpdate(data.shopId, {averageRating: newAverage, $inc: {numRates: 1}}, {new: true});

    await Rating.create({
      ratedShop: data.shopId,
      raterId: data.userId,
      rating: data.rating,
    });

    const responseData = {
      shop: updatedShop.toJSON(),
    };

    return apiResponse.successResponse(res, 'Successfully rated a shop', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

// TODO: Implement test cases for this function to ensure proper functionality
shopController.updateARating = async (req, res, next) => {
  try {
    const data = {
      ratingId: req.body.rating,
      userId: req.payload._id,
      newRating: req.body.newRating,
    };

    const rating = await Rating.findOne({raterId: data.userId, _id: data.ratingId});
    if(!rating) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id or you are not allowed to view it');

    const shop = await Shop.findOne({_id: rating.ratedShop});
    if(!shop) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id');

    const newAverage = ((shop.averageRating * shop.numRates) - rating.rating + data.newRating) / shop.numRates;
    const updatedShop = await Shop.findByIdAndUpdate(shop._id, {averageRating: newAverage}, {new: true});

    const updatedRating = await Rating.findByIdAndUpdate(data.ratingId, {rating: data.newRating}, {new: true});

    const responseData = {
      shop: updatedShop.toJSON(),
      updatedRating: updatedRating.toJSON(),
    };

    return apiResponse.successResponse(res, 'Successfully updated a rating', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.removeARating = async (req, res, next) => {
  try {
    const data = {
      ratingId: req.body.rating,
      userId: req.payload._id,
    };

    const rating = await Rating.findOne({raterId: data.userId, _id: data.ratingId});
    if(!rating) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id or you are not allowed to view it');

    const shop = await Shop.findOne({_id: rating.ratedShop});
    if(!shop) return apiResponse.notFoundResponse(res, 'Could not find a shop with the given id');

    const newAverage = ((shop.averageRating * shop.numRates) - rating.rating) / (shop.numRates - 1);
    const updatedShop = await Shop.findByIdAndUpdate(shop._id, {averageRating: newAverage, $inc: {numRates: -1}}, {new: true});

    await Rating.deleteOne({_id: data.ratingId});

    const responseData = {
      shop: updatedShop.toJSON(),
    };

    return apiResponse.successResponse(res, 'Successfully removed a rating', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.searchAll = async (req, res, next) => {
  try {
    const data = {
      text: req.body.text,
      location: req.body.location,
    };

    const searchWords = data.text.trim().split(/\s+/);
    
    // find service types with the given data
    var query = {
      $and: [
        ...searchWords.map(word => ({
          $or: [
            {name: {$regex: new RegExp(word, 'i')}},
          ]
        }))
      ]
    };
    
    const types = await ServiceType.find(query);
    if(!types && types != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch types');

    var typeIDs = types.map(type => {
      return type._id;
    });

    // find offered services with the given data
    var query = {
      $and: [
        ...searchWords.map(word => ({
          $or: [
            {name: {$regex: new RegExp(word, 'i')}},
            {type: {$in: typeIDs}},
          ]
        }))
      ]
    };
    
    const services = await OfferedService.find(query).sort({createdAt: -1});
    if(!services && services != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch services');

    // find shops with the given data
    var query = {
      $and: [
        ...searchWords.map(word => ({
          $or: [
            {name: {$regex: new RegExp(word, 'i')}},
          ]
        })),
        {
          address: {
            country: location.country,
            city: location.city,
          }
        }
      ]
    };
    
    const shops = await Shop.find(query).sort({createdAt: -1});
    if(!shops && shops != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch shops');

    const responseData = {
      services: services,
      shops: shops,
    };

    return apiResponse.successResponse(res, 'Successfully fetched search results', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

shopController.getShopsByServiceType = async (req, res, next) => {
  TWENTY_KM = 20 * 1000;

  try {
    const data = {
      type: req.body.id,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      gender: req.body.gender,
      price: req.body.price,
    };

    var query = data.longitude && {
      'address.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [data.longitude, data.latitude]
          },
          $maxDistance: TWENTY_KM,
        }
      },
    };

    const shops = await Shop.find(query);
    if(!shops && shops != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch shops');

    const shopIDs = shops.map(shop => {
      return shop._id
    });

    const priceQuery = data.price && {cost: {$gte: data.price[0], $lte: data.price[1]}};
    var query = {
      provider: {$in: shopIDs},
      type: data.type,    
      ...priceQuery,
    };

    const services = await OfferedService.find(query).sort({createdAt: -1}).populate('provider');
    if(!services && services != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch services');

    const updatedServices = await Promise.all(services.map(async (service) => {
      const genderQuery = data.gender && { genderPreference: data.gender };
      var query = {
        _id: service.provider._id,
        ...genderQuery,
      };
      
      const shop = await Shop.findOne(query);
      if(!shop) return;

      const distance = shop.distance(data.longitude, data.latitude);
      const shopObject = service.toObject();
      shopObject.distance = distance;
    
      return shopObject;
    }));    

    const filteredServices = updatedServices.filter(service => service);

    const responseData = {
      serviceProviders: filteredServices,
    };

    return apiResponse.successResponse(res, 'Successfully fetched shops with the given service type', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

module.exports = shopController;