const express = require('express')
const { connectDB } = require('./server/src/config/db')
const cors = require('cors')
const userRoutes = require('./src/routes/user.routes')
const eventRoutes = require('./src/routes/event.routes')
const guestRoutes = require('./src/routes/guest.routes')
const taskRoutes = require('./src/routes/task.routes')
const budgetRoutes = require('./src/routes/budget.routes')
const app = express()
app.use(cors())
app.use(express.json())


// connectDB('mongodb://localhost:27017/event-planner')
// .then(()=> console.log('connected succesfully'))
// .catch(err => console.log('error', err))

let isConnected = false;

async function connectToMongoDb() {
  try{
    await connectDB(process.env.mongo_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
   isConnected = true;
    console.log('connected succesfully')
  } catch(error){
    console.log('error connecting to mongodb',error)
  }
};

// connectToMongoDb();
app.use((req, res, next) => {
  if(!isConnected) {
    connectToMongoDb();
  }
  next();
})

app.get('/', (req, res) => {
  res.send("API working");
});
app.use((req, res, next) => {
  console.log("➡️ Request:", req.method, req.url);
  next();
});
app.use("/api/users", userRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/guests", guestRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/budgets", budgetRoutes)

// app.listen(5000, () => 
//   console.log('server strarted on port 5000'))

module.exports = app;
