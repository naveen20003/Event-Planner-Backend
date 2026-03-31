const express = require('express');
const router = express.Router()
const Auth = require('../middlewares/auth.middleware');
const{  
    HandleCreateguest,
    HandleGetAllGuests,
    HandleGetGuestById,
    HandleUpdateGuest,
    HandleDeleteGuest } = require('../controllers/guest.controller');


// create guest route
router.post("/", Auth,  HandleCreateguest);

// read guest route
router.get("/", Auth,  HandleGetAllGuests);

// read by id guest route
router.get("/:id", Auth,  HandleGetGuestById);

// update guest route
router.put("/:id", Auth,  HandleUpdateGuest);

// delete guest route
router.delete("/:id", Auth,  HandleDeleteGuest);

module.exports = router;