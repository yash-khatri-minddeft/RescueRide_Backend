const express = require('express')
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;
const session = require('express-session');

const AdminRouter = require('./routes/AdminRouter');
const AuthMiddleWare = require('./middlewares/AuthMiddleWare');
const ControllerRouter = require('./routes/ControllerRoutes');
const { Server } = require('socket.io');
const driverRouter = require('./routes/DriverRoutes');
const ambulance = require('./models/AmbulanceModel');

const io = new Server({
  cors: {
    origin: "http://localhost:5173"
  }
})

app.use(express.json())
app.use(session({
  secret: 'tKcOSCwZq7twiFbdxDjVKbD6M0bKOIbKD6GEXdoW',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
  }
}))
app.use('/api/admin', AdminRouter);
app.use('/api/controller', ControllerRouter);
app.use('/api/driver',driverRouter);
app.listen(4000, () => {
  mongoose.connect(process.env.CLUSTER_URL)
    .then(() => {
      console.log('Database Connected')
    })
    .catch((err) => {
      throw err;
    })
  console.log('Server Started')
})


io.on('connection', (socket) => {
  socket.on('join', (account) => {
    socket.join(account.room)
  })
  socket.on('greetings', (data) => {
    console.log('hi', data)
    io.emit('new_booking', (data))
  })
  socket.on('join', bookingId => {
    console.log(bookingId)
    socket.join(bookingId)
  })
  socket.on('update-booking-status', id => {
    console.log(id)
    io.to(id).emit('get_new_location','HI'+id)
  })
  socket.on('update_location', async data => {
    // console.log(data)
    const updatedCoords = await ambulance.findOneAndUpdate({ _id: data.id }, { latitude: data.latitude, longitude: data.longitude })
    io.emit('get_location', updatedCoords)
  })
})
io.listen(8080)