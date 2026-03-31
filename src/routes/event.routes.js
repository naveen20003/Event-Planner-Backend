const express = require('express');
const Auth = require('../middlewares/auth.middleware');
const router = express.Router()
const { HandleCreateEvent,
        HandleGetAllEvent,
        HandleGetEventById,
        HandleUpdateEvent,
        HandleDeleteEvent,
        HandleReadAllEvent,
        HandleInviteCode } = require('../controllers/event.controller');


// create Event
router.post("/", Auth,  HandleCreateEvent)

// read event route
router.get("/readevents", Auth,  HandleReadAllEvent)

//sorting ANd Filtering Events
router.get("/", Auth,  HandleGetAllEvent)

{/*
// generate Invite code
router.get("/:id", Auth, HandleInviteCode);
*/}

// read event by id route

router.get("/:id", Auth,  HandleGetEventById);

// update event route

router.put("/:id", Auth,  HandleUpdateEvent);

// delete event route

router.delete("/:id", Auth,  HandleDeleteEvent);

module.exports = router;