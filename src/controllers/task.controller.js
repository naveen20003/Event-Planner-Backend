const Task = require('../models/tasks.model')


async function HandleCreateTask(req, res) {
    try{
  const {name,deadline,task,taskstatus} = (req.body)
    const createdtask = await Task.create({
      userId: req.user.id,
      name: name,
      deadline: deadline,
      task: task,
      taskstatus: taskstatus
    })
    res.send(createdtask)
  } catch (error) {
    console.error(error)
  }
};

async function HandleReadAllTasks(req, res) {
   try{
        const rtask = await Task.find({userId: req.user.id});
        res.send(rtask)
  } catch(error) {
    console.error(error)
   }
};

async function HandleGetTaskById(req, res) {
    try {
     const rTask = await Task.findOne({ _id: req.params.id, userId: req.user.id})
     console.log("Task found:", rTask)
     res.json(rTask)
   } catch (error) {
     console.error(error)
   }
};

async function HandleUpdateTask(req, res) {
    try {
     const { id } = req.params
     const update = req.body
     const utdtask = await Task.findOneAndUpdate({_id: id, userId: req.user.id}, update, {returnDocument: "after"});
     res.json(utdtask)
   } catch (error) {
     console.error(error)
   }
}

async function HandleDeleteTask(req, res) {
    try{
    const { id } = req.params
    const deletetask = await Task.findOneAndDelete({_id: id, userId: req.user.id});
    res.status(200).json({message:'task deleted successfully', task: deletetask})
   } catch(error) {
    console.error(error)
   }
};

async function HandleGetAllTasks(req, res) {
    try{
    const { search, sort } = req.query;

    let query = {
      $or:[
          {name: {$regex: search, $options: 'i'}},
          {deadline: { $regex: search}},
          {task: { $regex: search, $options: 'i'}},
          {taskstatus: { $regex: search, $options: 'i'}},
      ]
    };
       console.log(search,sort)

    let sortOptions = {};
    if (sort === 'new_task') sortOptions.date = -1;
    if (sort === 'old_task') sortOptions.date = 1;
    console.log(sortOptions)

  const rtask = await Task.find({ ...query, userId: req.user.id}).sort(sortOptions);

  res.json(rtask)
  
  } catch(error) {
    console.error(error)
  }
};

module.exports = {
   HandleCreateTask,
   HandleGetAllTasks,
   HandleGetTaskById,
   HandleUpdateTask,
   HandleDeleteTask,
   HandleReadAllTasks
};
