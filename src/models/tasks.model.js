const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
   userId:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
     },
   name: String,
   deadline: String,
   task: String,
   taskstatus: String
});

const Task = mongoose.model("tasks", TaskSchema)
module.exports = Task