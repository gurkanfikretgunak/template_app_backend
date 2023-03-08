const {Schema, model} = require('mongoose');

const NotificationSchema = new Schema(
    {
        receiver: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        sender: {
            type: Schema.Types.ObjectId, 
            ref: 'Shop',
            required: true,
        },
        message: {
            text: {
                type: String,
                required: true,
            },
            detailId: {
                type: Number,
            },
        },
        type: {
            type: Number,
            enum: [1, 2, 3],
            required: true,
        },
        seen: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: { 
            createdAt: true, 
            updatedAt: false 
        }
    },
);

NotificationSchema.methods = {


};


const Notification = model('Notification', NotificationSchema);

module.exports = Notification;