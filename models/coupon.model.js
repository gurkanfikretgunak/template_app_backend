const {Schema, model} = require('mongoose');

const CouponSchema = new Schema(
    {
        sharedBy: {
            type: Schema.Types.ObjectId, 
            ref: 'Shop',
            required: true,
        },
        couponName: {
            type: String,
            required: true,
        },
        couponDesc: {
            type: String,
        },
        discount: {
            type: Number,
            required: true,
        },
        expirationDate: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: { 
            createdAt: true, 
            updatedAt: false 
        }
    },
);

CouponSchema.methods = {
    /**
     * Check if the coupon has expired
     *
     * @public
     * @returns {Boolean} isExpired - true if the coupon has expired, false otherwise
     */
    isExpired() {
        return this.expirationDate < new Date();
    }

};


const Coupon = model('Coupon', CouponSchema);

module.exports = Coupon;