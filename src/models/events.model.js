const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
   eventname: String,
   date: String,
   time: String,
   venue: String,
   eventtype: String,
   eventtheme: String,
   guestcount: Number,
   eventsettings: String,
   guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guests",
    },
  ],
});

const Event = mongoose.model("events", EventSchema)
module.exports = Event