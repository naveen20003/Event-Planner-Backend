const Guest = require('../models/guests.model')


async function HandleCreateguest(req, res) {
    try {
        const {guestname,guestemail,guestphone,status} = (req.body);
        const gcrd = await Guest.create({
        userId: req.user.id,
        guestname: guestname,
        guestemail: guestemail,
        guestphone: guestphone,
        status: status,
        });
        res.send(gcrd);
    } catch (error) {
       console.error(error) 
       res.status(500).json({ message: "Error fetching guests" });        
    };
};

async function HandleGetAllGuests(req, res) {
    try {
        console.log({userId: req.user})
    const guests = await Guest.find({userId: req.user.id});
    console.log(guests)
    res.json(guests);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching guests" });
  } 
};

async function HandleGetGuestById(req, res) {
    try {
    const guest = await Guest.findOne({_id: req.params.id, userId: req.user.id});
    res.json(guest);
    } catch (error) {
        console.error(error)
    }
};

async function HandleUpdateGuest(req, res) {
    try{
        const {id} = req.params;
        const Updates = req.body;
        const updatedguest = await Guest.findOneAndUpdate({_id: id, userId: req.user.id},Updates,{returnDocument: "after"});
        res.json(updatedguest);
  } catch (error) {
        console.error('error in update from server',error)
  }
};

async function HandleDeleteGuest(req, res) {
   try{
    const {id} = req.params;
    const deletedguest = await Guest.findOneAndDelete({_id: id,userId: req.user.id});
    res.json(deletedguest);
  } catch (error) {
     console.error('error in update from server',error)
  }
};

module.exports = {
    HandleCreateguest,
    HandleGetAllGuests,
    HandleGetGuestById,
    HandleUpdateGuest,
    HandleDeleteGuest
}