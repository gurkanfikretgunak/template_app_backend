const {compareSync, hashSync} = require('bcrypt-nodejs');
const {Schema, model} = require('mongoose');
const JWT = require('jsonwebtoken');

const APIError = require('../services/error.js');
const apiResponse = require('../utils/apiResponse');
const client = require('../config/redis')


const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        surname: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        profilePicture: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        gender: {
            type: Number,
            enum: [0, 1, 2, 3],  // 0: prefer not to say, 1: male, 2: female, 3: other
            default: 0,
        },
        favoriteShops: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true
    },
);

// Hash the user password on creation
UserSchema.pre('save', function(next) {
    this.password = this._hashPassword(this.password);
    return next();
});

UserSchema.methods = {
    /**
     * Authenticate the user
     *
     * @public
     * @param {String} password - provided by the user
     * @returns {Boolean} isMatch - password match
     */
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    
    /**
     * Hash the user password
     *
     * @private
     * @param {String} password - user password choose
     * @returns {String} password - hash password
     */
    _hashPassword(password) {
        return hashSync(password);
    },

    /**
     * Generate a JWT access token for authentication
     * @async
     * @public
     * @param {Function} next - Express next function
     * @returns {Promise<string>} The generated JWT access token
     */
    createAccessToken(next) {
        return new Promise((resolve, reject) => {
            const payload = {_id: this._id}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: process.env.EXPIRESIN,
            }

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, err.message)))
                }
                resolve(token)
            })
        })
    },

    /**
     * Generate a jwt refresh token for authentication
     * @async
     * @public
     * @param {Function} next - Express next function
     * @returns {Promise<String>} The generated JWT refresh token
     */
    createRefreshToken(next) {
        return new Promise((resolve, reject) => {
          const payload = {_id: this._id}
          const secret = process.env.REFRESH_TOKEN_SECRET
          const options = {
            expiresIn: process.env.EXPIRESIN,
          }

          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              reject(next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, err.message)))
            }

            const id = this._id.toString();
            client.SET(id, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
              if (err) {
                console.log(err.message)
                reject(next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, err.message)))
              }
              resolve(token)
            })
          })
        })
    },

};


const User = model('User', UserSchema);

module.exports = User;