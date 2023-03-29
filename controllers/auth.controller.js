// PACKAGES
const passport = require('passport');

// UTILS / HELPERS / SERVICES
const APIError = require('../services/error.js');
const apiResponse = require('../utils/apiResponse');
const {verifyRefreshToken, removeRefreshToken} = require('../helpers/jwt');
const {checkVerificationCode} = require('../helpers/helper');

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

      return apiResponse.successResponse(res, 'Successfully registered. Please check your email', responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
}

authController.verifyAccount = async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      code: req.body.code,
    };

    const existingUser = await User.findOne({email: data.email});
    if(!existingUser) return apiResponse.notFoundResponse(res, 'A record with this email does not exists', next);

    const isCorrect = checkVerificationCode(existingUser._id, data.code);
    if(!isCorrect) return apiResponse.validationErrorResponse(res, 'Invalid code', next);

    const verifiedUser = await User.findByIdAndUpdate(
      existingUser._id, 
      {verified: true}, 
      {new: true, useFindAndModify: false}
    );
    if(!verifiedUser) return apiResponse.serverErrorResponse(res, 'Unable to verify user');

    const accessToken = await verifiedUser.createAccessToken(next);
    const refreshToken = await verifiedUser.createRefreshToken(next);

    const responseData = {
      user: verifiedUser.toJSON(),
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return apiResponse.successResponse(res, 'Successfully verified account', responseData);
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

      if(!user.verified) return apiResponse.unauthorizedResponse(res, 'Please verify your account');

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

authController.socialMediaLogin = async (req, res, next) => {
  var provider = req.url.split('s=')[1]; // Extract the string after 's='
  provider = provider.split('?')[0];  // Extract the string before '?'

  passport.authenticate(provider, async (err, user, token) => {
    try {
      if (err) {console.log('ERR', err); throw new APIError(null, apiResponse.API_STATUS.UNAUTHORIZED, err.message);}
      if (!user) throw new APIError(null, apiResponse.API_STATUS.UNAUTHORIZED, 'User not found');

      const responseData = {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };

      return apiResponse.successResponse(res, `Successfully logged in with ${provider}`, responseData);
    } catch (error) {
      console.log(error)
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, error));
    }
  })(req, res, next);
};

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