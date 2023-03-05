// UTILS / HELPERS / SERVICES
const APIError = require('../services/error');
const apiResponse = require('../utils/apiResponse');

exports.errorHandler = (err, req, res) => {
  if (!err) return new APIError('Error', apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, err);

  const error = {
    message: err.message || 'Internal Server Error',
  };

  res.status(err.status || apiResponse.API_STATUS.UNPROCESSABLE_ENTITY).json(error);
  return;
};
