const {Schema, model} = require('mongoose');

const RatingSchema = new Schema(
    {
        ratedShop: {
            type: Schema.Types.ObjectId, 
            ref: 'Shop',
            required: true,
        },
        raterId: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
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

RatingSchema.methods = {

};


const Rating = model('Rating', RatingSchema);

module.exports = Rating;