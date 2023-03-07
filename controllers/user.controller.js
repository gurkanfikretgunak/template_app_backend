// PACKAGES
const {compareSync, hashSync} = require('bcrypt-nodejs');

// UTILS / HELPERS / SERVICES
const APIError = require('../services/error.js');
const apiResponse = require('../utils/apiResponse');
const {uploadImage, removeImage} = require('../services/cloudinary');

// MODELS
const User = require('../models/user.model');
const UserAddress = require('../models/address.model');
const Payment = require('../models/payment.model');
const Notification = require('../models/notification.model');

const userController = {};

userController.updateUserInfo = async (req, res, next) => {
    try {
      const filter = { _id: req.payload._id };

      if(req.file) {
        var fileName = `user/${Date.now()}`;
        var stream = req.file.buffer;
        var uploadedImage = await uploadImage(stream, fileName);
        if(!uploadedImage) return apiResponse.serverErrorResponse(res, 'Unable to upload image to cloudinary');

        var user = await User.findOne(filter);
        if(user.profilePicture) await removeImage(user.profilePicture);
      };

      const data = {
        name: req.body.name,
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber,
        profilePicture: uploadedImage?.secure_url,
      };

      const updatedUser = await User.findOneAndUpdate(filter, data, {new: true});
      if(!updatedUser) return apiResponse.serverErrorResponse(res, 'Unable to update user profile');

      const responseData = {
        user: updatedUser.toJSON(),
      };

      return apiResponse.successResponse(res, 'Successfully updated user profile', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.updatePassword = async (req, res, next) => {
    try {
      const data = {
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
      };

      if(data.currentPassword === data.newPassword) 
        return apiResponse.alreadyExistsResponse(res, 'New password can not be the same as the current password');

      const user = await User.findOne({_id: req.payload._id});
      if (!user) return apiResponse.notFoundResponse(res, 'Could not find a user with this token');

      const isMatch = await user.authenticateUser(data.currentPassword);
      if (!isMatch) return apiResponse.unauthorizedResponse(res, 'Invalid credentials');

      const hashedPassword = hashSync(data.newPassword);
      const update = { password: hashedPassword};
      const updatedUser = await User.findByIdAndUpdate(req.payload._id, update, {new: true});
      if(!updatedUser) return apiResponse.serverErrorResponse(res, 'Unable to update user password');

      const responseData = {
        user: updatedUser,
      };

      return apiResponse.successResponse(res, 'Successfully updated password', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.addAddress = async (req, res, next) => {
    try {
      const data = {
        addressOwner: req.payload._id,
        address: req.body.address,
      };

      const createdAddress = await UserAddress.create(data);
      if(!createdAddress) return apiResponse.serverErrorResponse(res, 'Unable to create address');

      const responseData = {
        address: createdAddress,
      };

      return apiResponse.successResponse(res, 'Successfully created an address', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.deleteAddress = async (req, res, next) => {
    try {
      const data = {
        addressOwner: req.payload._id,
        _id: req.params.id,
      };

      const address = await UserAddress.findOne(data);
      if(!address) return apiResponse.notFoundResponse(res, 'Could not find an address with the given id');

      await UserAddress.deleteOne(data);

      const responseData = {
        _id: data._id,
      };

      return apiResponse.successResponse(res, 'Successfully deleted the address', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.getAddresses = async (req, res, next) => {
    try {
      const data = {
        addressOwner: req.payload._id,
      };

      const addresses = await UserAddress.find(data);  //TODO: Decide whether to add pagination or not.
      if(!addresses) return apiResponse.serverErrorResponse(res, 'Unable to fetch addresses');

      const responseData = {
        addresses: addresses,
      };

      return apiResponse.successResponse(res, 'Successfully fetched addresses', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.addPaymentCard = async (req, res, next) => {
    try {
      const data = {
        owner: req.payload._id,
        name: req.body.name,
        surname: req.body.surname,
        expirationDate: req.body.expirationDate,
        cardNumber: req.body.cardNumber,
        title: req.body.title,
      };

      const createdCard = await Payment.create(data);
      if(!createdCard) return apiResponse.serverErrorResponse(res, 'Unable to create card');

      const responseData = {
        card: createdCard.toJSON(),
      };

      return apiResponse.successResponse(res, 'Successfully created card', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.deletePaymentCard = async (req, res, next) => {
  try {
    const data = {
      owner: req.payload._id,
      _id: req.params.id,
    };

    const card = await Payment.findOne(data);
    if(!card) return apiResponse.notFoundResponse(res, 'Could not find a card with the given id');

    await Payment.deleteOne(data);

    const responseData = {
      _id: data._id,
    };

    return apiResponse.successResponse(res, 'Successfully deleted the card', responseData);
  } catch (error) {
    console.log(error)
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
  }
}

userController.getPaymentCards = async (req, res, next) => {
    try {
      const data = {
        owner: req.payload._id,
      };

      const cards = await Payment.find(data);   //TODO: Pagination
      if(!cards) return apiResponse.serverErrorResponse(res, 'Unable to fetch cards');

      const responseData = {
        cards: cards,
      };

      return apiResponse.successResponse(res, 'Successfully fetched cards', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.getNotifications = async (req, res, next) => {
    try {
      const data = {
        receiver: req.payload._id,
      };

      const notifications = await Notification.find(data);
      if(!notifications) return apiResponse.serverErrorResponse(res, 'Unable to fetch notifications');

      var formattedData = {
        today: [],
        thisWeek: [],
        thisMonth: [],
        older: [],
      };

      const now = new Date();
      const ONE_DAY = 1000 * 60 * 60 * 24;

      notifications.map(notification => {
        const createdAt = new Date(notification.createdAt);
        const dayDifference = Math.round((now - createdAt) / ONE_DAY);
    
        if (dayDifference === 0) {
            formattedData.today.push(notification);
        } else if (dayDifference <= 7) {
            formattedData.thisWeek.push(notification);
        } else if (dayDifference <= 30) {
            formattedData.thisMonth.push(notification);
        } else {
            formattedData.older.push(notification);
        }
      });

      const responseData = {
        notifications: formattedData,
      };

      return apiResponse.successResponse(res, 'Successfully fetched notifications', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

userController.getFavoriteShops = async (req, res, next) => {
    try {
      const data = {
        _id: req.payload._id,
      };

      const user = await User.findOne(data);
      if(!user) return apiResponse.serverErrorResponse(res, 'Unable to fetch user');

      const responseData = {
        favoritedShops: user.toJSON().favoriteShops,
      };

      return apiResponse.successResponse(res, 'Successfully fetched favorited shops', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

module.exports = userController;