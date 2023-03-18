const {Schema, model} = require('mongoose');

const ServiceTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { 
            createdAt: true, 
            updatedAt: false 
        }
    },
);

ServiceTypeSchema.methods = {

};


const ServiceType = model('ServiceType', ServiceTypeSchema);

module.exports = ServiceType;