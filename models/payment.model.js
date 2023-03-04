const {hashSync} = require('bcrypt-nodejs');
const {Schema, model} = require('mongoose');

const PaymentSchema = new Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        },
        name: {
            type: String,  
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
        },
        title: {
            type: String
        }
    },
    {
        timestamps: true
    },
);

// Hash the card number on creation
PaymentSchema.pre('save', function(next) {
    this.cardNumber = this._hashPassword(this.cardNumber);
    return next();
});

PaymentSchema.methods = {
    /**
     * Hash the card number
     *
     * @private
     * @param {String} cardNumber - card number choose
     * @returns {String} card number - hash card number
     */
    _hashPassword(cardNumber) {
        return hashSync(cardNumber);
    },


};


const Payment = model('Payment', PaymentSchema);

module.exports = Payment;