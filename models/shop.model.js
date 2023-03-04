const {Schema, model} = require('mongoose');

const ShopSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        genderPreference: {
            type: String,
            enum: ['male', 'female', 'unisex'],
            default: 'unisex',
        },
        address: {
            coordinates: [Number],
            fullAdress: String,
            city: String,
            country: String,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        numRates: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: { 
            createdAt: true, 
            updatedAt: false 
        }
    },
);

ShopSchema.methods = {
    /**
     * Calculate the new average rating for the shop based on a new rating
     *
     * @public
     * @param {Number} rating - the new rating to calculate the average with
     * @returns {Number} - the updated average rating
     */
    updateAverageRating(rating) {
        const newNumRates = this.numRates + 1;
        const newAverageRating = ((this.averageRating * this.numRates) + rating) / newNumRates;
        this.averageRating = newAverageRating;
        this.numRates = newNumRates;
        return this.save();
    }
};


const Shop = model('Shop', ShopSchema);

module.exports = Shop;