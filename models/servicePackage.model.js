const {Schema, model} = require('mongoose');

const ServicePackageSchema = new Schema(
    {
        provider: {
            type: Schema.Types.ObjectId, 
            ref: 'Shop',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            default: 0,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        image: {
            type: String
        },
        services: [{
            type: Schema.Types.ObjectId, 
            ref: 'OfferedService',
        }]
    },
    {
        timestamps: { 
            createdAt: true, 
            updatedAt: false 
        }
    },
);

ServicePackageSchema.methods = {

};


const ServicePackage = model('ServicePackage', ServicePackageSchema);

module.exports = ServicePackage;