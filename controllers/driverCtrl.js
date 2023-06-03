const { async } = require("crypto-random-string");
const ambulance = require("../models/AmbulanceModel");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { sendMail } = require("./MailController");
const booking = require("../models/BookingModel");

const checkLogin = async (req, res) => {
  const getUserDetail = await ambulance.findById({ _id: req.body.userId });
  if (getUserDetail) {
    res.status(200).send({
      message: "User Logged In",
      isDriver: true,
      userId: req.body.userId,
    });
  } else {
    res.status(200).send({ message: "User not found", isDriver: false });
  }
};

const authController = async (req, res) => {
  try {
    const user = await ambulance.findById({ _id: req.body.userId });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User Not Found", success: false });
    } else {
      user.driverPassword = undefined;
      req.session.user = user._id;
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "auth error", success: false, error });
  }
};

const driverLoginController = async (req, res) => {
  try {
    const user = await ambulance.findOne({ driverEmail: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.driverPassword);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    req.session.user = user._id;
    req.session.OTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(req.session.OTP);
    var maskedid = "";
    var myemailId = req.body.email;
    var index = myemailId.lastIndexOf("@");
    var prefix = myemailId.substring(0, index);
    var postfix = myemailId.substring(index);

    var mask = prefix
      .split("")
      .map(function (o, i) {
        if (i < 2 || i >= index - 2) {
          return o;
        } else {
          return "*";
        }
      })
      .join("");
    maskedid = mask + postfix;
    res
      .status(200)
      .send({ message: `OTP sent succesfully to ${maskedid}`, success: true });
    sendMail(req.body.email, req.session.OTP);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in Login ${error.message}`,
    });
  }
};

const driverOTPController = async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp == req.session.OTP) {
      const token = jwt.sign(
        { id: req.session.user },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: '7d'
        }
      );
      res.status(200).send({ message: 'Login Successfully', success: true, token })
    }
    else {
      res.status(200).send({ message: 'OTP invalid', success: false })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in Login ${error.message}`
    })
  }
}

const updateAmbulanceLocation = async (req, res) => {
  const { id, latitude, longitude } = req.body;
  try {
    const updatedCoords = await ambulance.findOneAndUpdate({ _id: id }, { latitude: latitude, longitude: longitude })
    if (updatedCoords) {
      res.status(200).send({ success: true, })
    } else {
      res.status(200).send({ success: false, message: 'Ambulance not found!' })
    }
  } catch (error) {

  }
}

const accpetBookingRequest = async (req, res) => {
  const { ambulanceId, bookingId } = req.body;
  console.log(bookingId)
  const updateAmbulanceStatus = await ambulance.findOneAndUpdate({ _id: ambulanceId }, { Status: 'working' })
  const updateBookingStatus = await booking.findOneAndUpdate({ _id: bookingId }, { status: 'current', ambulance_number: ambulanceId, ambulance_latitude: updateAmbulanceStatus.latitude, ambulance_longitude: updateAmbulanceStatus.longitude})
  console.log(updateBookingStatus)
  if (updateAmbulanceStatus && updateBookingStatus) {
    res.status(200).send({ success: true, message: 'Booking Accepted!' })
  } else {
    res.status(200).send({ success: false, message: 'Error while Booking Ambulance!' })
  }
}

module.exports = {
  checkLogin,
  authController,
  driverLoginController,
  driverOTPController,
  updateAmbulanceLocation,
  accpetBookingRequest,
};