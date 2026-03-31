const Event = require('../models/events.model');
const Invite = require('../models/invitationschema');


async function HandleCreateEvent(req, res) {
   try{
    const {eventname,eventdate,eventtime,venue,eventtype,eventtheme,guestcount,eventsettings,guests} = (req.body)
    if (!guests || guests.length==='0') {
     res.status(404).json({ message: 'select at least one guest'})
   }
  const events = await Event.create({
   userId: req.user.id,
   eventname: eventname,
   date: eventdate,
   time: eventtime,
   venue: venue,
   eventtype: eventtype,
   eventtheme: eventtheme,
   guestcount: guestcount,
   eventsettings: eventsettings,
   guests: guests,
  });
{/*
  const invitations = guests.map((guestId)=>({
     eventId: events._id,
     guestId,
     invitecode: nanoid(10),
  }));
  await Invite.insertMany(invitations);
  console.log("Invitations:", invitations);
  */}
  res.status(201)
  .json({message: 'invitation code with event created successfully', events});
} catch (error) {
  console.error(error)
}
};


async function HandleReadAllEvent(req, res) {
    try {
        const events = await Event.find({ userId: req.user.id });
        console.log(events)
        res.json(events);
    } catch (error) {
       console.error(error) 
    }
};


async function HandleGetEventById(req, res) {
   try {
       const events = await Event.findOne({_id: req.params.id, userId: req.user.id });
       res.json(events);
   } catch (error) {
      console.error(error)
   }
};

async function HandleUpdateEvent(req, res) {
   try{
    const {id} = req.params;
    const Updates = req.body;
    const updatedevent = await Event.findOneAndUpdate({_id: id, userId: req.user.id},Updates,{returnDocument: "after"});
    res.json(updatedevent);
  } catch (error) {
     console.error('error in update from server',error)
  }
};

async function HandleDeleteEvent(req, res) {
   try{
    const {id} = req.params;
    const deletedevent = await Event.findOneAndDelete({_id: id, userId: req.user.id});
    res.json(deletedevent);
    } catch (error) {
        console.error('error in update from server',error)
    }
};

async function HandleGetAllEvent(req, res) {
    try {
        const{ search, sort} = req.query;
        console.log('not getting query',req.query)
        console.log('not getting value',sort)
        {/*if(!search){
          const allevents = await Event.find();
          return res.json(allevents)
        } */}
        let query = {
         $or: [
          {eventname: { $regex: search, $options: 'i'}},
          {date : { $regex: search}},
          {time : { $regex: search, $options: 'i'}},
          {venue : { $regex: search, $options: 'i'}},
        ]};
        let sortOption = {};
        if(sort === 'newest_events' ) sortOption.date = -1;
    
        if(sort === 'oldest_events') sortOption.date = 1;
        
            
        console.log(sortOption)
        const searchdata = await Event.find({ ...query, userId: req.user.id}).sort(sortOption)
        res.json(searchdata);
      } catch (error) {
        console.error(error)
      }
};

async function HandleInviteCode(req, res) {
    try {
        const invites = await Invite.find({
          eventId: req.params.id, // ✅ correct field
        }).populate("guestId");
    
        console.log("Invites:", invites);
    
        res.json(invites);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
};

module.exports = {
    HandleCreateEvent,
    HandleGetAllEvent,
    HandleGetEventById,
    HandleUpdateEvent,
    HandleDeleteEvent,
    HandleReadAllEvent,
    HandleInviteCode
}