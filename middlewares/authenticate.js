// PACKAGES
const JWT = require('jsonwebtoken');

// UTILS / HELPERS / SERVICES
const APIError = require('../services/error.js');
const apiResponse = require('../utils/apiResponse');

exports.authenticate = async (req, res, next) => {
    if (!req.headers['authorization']) return next(new APIError('Please log in first', apiResponse.API_STATUS.UNAUTHORIZED, null));
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log(err)
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
          return next(new APIError(message, apiResponse.API_STATUS.UNAUTHORIZED, null));
      }
      req.payload = payload
      next()
    });

};
