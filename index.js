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
const http = require('http');
const server = http.createServer(app);
const driverRouter = require('./routes/DriverRoutes');
const ambulance = require('./models/AmbulanceModel');
const cors = require('cors');
const hospital = require('./models/HospitalModel');

const io = new Server(server, {
  cors: {
    origin: "*"
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
app.use(cors())
app.use('/api/admin', AdminRouter);
app.use('/api/controller', ControllerRouter);
app.use('/api/driver',driverRouter);
server.listen(4000, () => {
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
  socket.on('greetings', (data) => {
    io.emit('new_booking', (data))
  })
  socket.on('join', bookingId => {
    socket.join(bookingId)
  })
  socket.on('update-booking-status-socket', async booking => {
    const getHospital = await hospital.findOne({_id:booking[0].hospitalid})
    socket.to(booking[1]).emit('get_new_location',[booking[0],getHospital])
  })
  socket.on('update_location', async data => {
    const updatedCoords = await ambulance.findOneAndUpdate({ _id: data.id }, { latitude: data.latitude, longitude: data.longitude })
    const getUpdatedCoords = await ambulance.findOne({_id: data.id})
    if(getUpdatedCoords.Status == 'ideal') {
      io.emit('get_location', getUpdatedCoords)
    }
    if(getUpdatedCoords.Status == 'working') {
      io.to(data.id).emit('get_location_private', getUpdatedCoords)
    }
  })
})