const {Schema, model} = require('mongoose');

const UserAddressSchema = new Schema(
    {
        addressOwner: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        address: {
            coordinates: [Number],
            fullAdress: String,
            city: String,
            country: String,
        },
    },
    {
        timestamps: true
    },
);

UserAddressSchema.methods = {


};


const UserAddress = model('UserAddress', UserAddressSchema);

module.exports = UserAddress;