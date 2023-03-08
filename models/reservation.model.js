const {Schema, model} = require('mongoose');

const ReservationSchema = new Schema(
    {
        reservationOwner: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        reservationPlace: {
            type: Schema.Types.ObjectId, 
            ref: 'Shop',
            required: true,
        },
        selectedServices: [{
            service: {
                serviceId: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferedService',
                    required: true,
                },
                amount: {
                    type: Number,
                    default: 1,
                }
            }
        }],
        totalPrice: {
            type: Number,
            required: true,
        },
        reservationDateTime: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true
    },
);

ReservationSchema.methods = {


};


const Reservation = model('Reservation', ReservationSchema);

module.exports = Reservation;