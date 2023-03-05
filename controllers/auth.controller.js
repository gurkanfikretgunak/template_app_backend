// UTILS / HELPERS / SERVICES
const APIError = require('../services/error.js');
const apiResponse = require('../utils/apiResponse');
const {verifyRefreshToken, removeRefreshToken} = require('../helpers/jwt')

// MODELS
const User = require('../models/user.model');
const authController = {};

authController.register = async (req, res, next) => {
    try {
      const data = {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
      };

      const existingUser = await User.findOne({email: data.email});
      if(existingUser) return apiResponse.alreadyExistsResponse(res, 'A record with this email already exists', next);

      const createdUser = await User.create(data);
      if(!createdUser) return apiResponse.serverErrorResponse(res, 'Unable to create user');

      const accessToken = await createdUser.createAccessToken(next);
      const refreshToken = await createdUser.createRefreshToken(next);

      const responseData = {
        user: createdUser.toJSON(),
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      return apiResponse.successResponse(res, 'Successfully registered', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

authController.login = async (req, res, next) => {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await User.findOne({email: data.email});
      if (!user) return apiResponse.notFoundResponse(res, 'Could not find a user with the given email');

      const isMatch = await user.authenticateUser(data.password);
      if (!isMatch) return apiResponse.unauthorizedResponse(res, 'Invalid credentials');

      const accessToken = await user.createAccessToken(next);
      const refreshToken = await user.createRefreshToken(next);

      const responseData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      return apiResponse.successResponse(res, 'Successfully logged in', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

authController.refreshToken = async (req, res, next) => {
    try {
      const data = {
        refreshToken: req.body.refreshToken,
      };

      const userId = await verifyRefreshToken(data.refreshToken, next)
      if (!userId) return apiResponse.notFoundResponse(res, 'Could not find a user with this refresh token');

      const user = await User.findOne({_id: userId})
      if (!user) return apiResponse.notFoundResponse(res, 'Could not find a user with this id');

      const accessToken = await user.createAccessToken(next);
      const refreshToken = await user.createRefreshToken(next);

      const responseData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      return apiResponse.successResponse(res, 'Successfully refreshed token', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

authController.logout = async (req, res, next) => {
    try {
      const data = {
        refreshToken: req.body.refreshToken,
      };

      const userId = await verifyRefreshToken(data.refreshToken, next)
      if (!userId) return apiResponse.notFoundResponse(res, 'Could not find a user with this refresh token');

      const val = await removeRefreshToken(userId, next)

      const responseData = {
        val: val,
      };

      return apiResponse.successResponse(res, 'Successfully logged out', responseData);

    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

module.exports = authController;