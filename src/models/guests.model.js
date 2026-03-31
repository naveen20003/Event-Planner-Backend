const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
   userId:{
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"},
   guestname: String,
   guestemail: String,
   guestphone: Number,
   status: String
});

const Guest = mongoose.model("guests", GuestSchema)
module.exports = Guest