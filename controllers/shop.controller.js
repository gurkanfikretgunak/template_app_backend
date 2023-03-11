// UTILS / HELPERS / SERVICES
const APIError = require('../services/error.js');
const apiResponse = require('../utils/apiResponse');

// MODELS
const User = require('../models/user.model');
const Shop = require('../models/shop.model');
const OfferedService = require('../models/offeredService.model');
const ServicePackage = require('../models/servicePackage.model');
const Coupon = require('../models/coupon.model');

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
    const recommends = await OfferedService.find({provider: data._id}).limit(5).sort({eventDateTime: 1});
    if(!recommends && recommends != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch service recommendations');

    // offered packages
    const packages = await ServicePackage.find({provider: data._id}).sort({eventDateTime: 1});
    if(!packages && packages != null) return apiResponse.serverErrorResponse(res, 'Unable to fetch service packages');

    // if the user favorited this shop
    var isFavorited = false;
    const user = await User.findOne({_id: data.userId});
    if(user.favoriteShops.includes(data._id)) isFavorited = true;

    const responseData = {
      shop: shop.toJSON(),
      coupons: coupons,
      recommends: recommends,
      packages: packages,
      isFavorited: isFavorited,
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

    const services = await OfferedService.find(data).sort({eventDateTime: 1});
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
    
    const services = await OfferedService.find(query).sort({ eventDateTime: 1 });
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

module.exports = shopController;