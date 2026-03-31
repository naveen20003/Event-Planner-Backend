const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
    },

    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guests',
    },

    invitecode: {
        type: String,
        unique: true,
    },

    status: {
        type: String,
        enum: ['accepted', 'declined', 'pending', 'maybe'],
        default: 'pending',
    },
}, {timestamps: true})

const Invite = mongoose.model("invitations", InvitationSchema)
module.exports = Invite