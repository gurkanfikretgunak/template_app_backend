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
        },
        serviceTypes: {
            type: [{
              name: String
            }],
            default: []
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
     * Haversine formula
     * Calculates the distance in kilometers between the shop's location and a given longitude/latitude point
     *
     * @public
     * @param {Number} longitude - the longitude of the point to calculate the distance to
     * @param {Number} latitude - the latitude of the point to calculate the distance to
     * @returns {Number} - the distance in kilometers
     */
    distance(longitude, latitude) {
        const shopLongitude = this.address.coordinates[0];
        const shopLatitude = this.address.coordinates[1];
    
        const earthRadius = 6371; // Radius of the earth in km
        const dLat = this._deg2rad(latitude - shopLatitude);
        const dLon = this._deg2rad(longitude - shopLongitude);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this._deg2rad(shopLatitude)) *
            Math.cos(this._deg2rad(latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c; // Distance in km
        return distance;
    },

    /**
    * Converts degrees to radians.
    *
    * @private
    * @param {Number} degrees - angle in degrees
    * @returns {Number} - angle in radians
    */
    _deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
};


const Shop = model('Shop', ShopSchema);
Shop.collection.createIndex({ 'address.coordinates': '2dsphere' });

module.exports = Shop;