const express = require('express');
const router = express.Router()
const Auth = require('../middlewares/auth.middleware');

const {
    HandleCreateTask,
    HandleGetAllTasks,
    HandleGetTaskById,
    HandleUpdateTask,
    HandleDeleteTask,
    HandleReadAllTasks
     } =  require('../controllers/task.controller');


// create task
router.post('/',  Auth, HandleCreateTask);

// read tasks route
router.get('/', Auth,  HandleGetAllTasks);

router.get('/readtask', Auth,  HandleReadAllTasks);


// read tasks by id
router.get('/:id', Auth,  HandleGetTaskById);

// update task route
router.put('/:id', Auth,  HandleUpdateTask)

// delete task route
router.delete('/:id', Auth,  HandleDeleteTask);

module.exports = router;