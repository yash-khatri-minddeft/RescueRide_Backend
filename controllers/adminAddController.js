const ambulance = require("../models/AmbulanceModel");
const controller = require("../models/ControllerModel");
const bcrypt = require("bcryptjs");
const hospital = require("../models/HospitalModel");
const cryptoRandomStringAsync = require("crypto-random-string");
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken");
const { sendMail, sendPassMail } = require("./MailController");
const booking = require("../models/BookingModel");

const adminaddController = async (req, res) => {
  try {
    const existingController = await controller.findOne({
      email: req.body.email,
    });
    if (existingController) {
      return res.status(200).send({
        message: "Controller Already Exists",
        success: false,
      });
    }
    const password = cryptoRandomStringAsync({ length: 12, type: "url-safe" });
    console.log(password);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;
    const newController = new controller(req.body);
    await newController.save();
    newController.password = undefined;
    const token = jwt.sign(
      { id: newController._id },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "1d",
      }
    );
    sendPassMail(password, req.body.email, token);
    res.status(201).send({
      message: "Controller Add Successfully",
      success: true,
      data: newController,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Add Controller ${error.message}`,
    });
  }
};

const adminaddambulanceController = async (req, res) => {
  try {
    const newUserAddAmbulance = await ambulance({ ...req.body });
    await newUserAddAmbulance.save();
    res.status(201).send({
      success: true,
      message: "Ambulance Added Successfully",
      data: newUserAddAmbulance
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Adding Ambulance",
    });
  }
};

const adminaddhospitalController = async (req, res) => {
  try {
    const newAddHospital = await hospital({ ...req.body });
    await newAddHospital.save();
    res.status(201).send({
      success: true,
      message: "Hospital Added Successfully",
      data: newAddHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctors",
    });
  }
};

const admingetallController = async (req, res) => {
  try {
    const fetchController = await controller.find({}, { password: 0 });
    res.status(200).send({
      success: true,
      message: "Controller List",
      data: fetchController,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Controller",
    });
  }
};

const usergethospitalController = async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const fetchHospital = await hospital.find({ $and: [{ longitude: { $gte: longitude - 0.2, $lte: longitude + 0.2 } }, { latitude: { $gte: latitude - 0.2, $lte: latitude + 0.2 } }] });
    res.status(200).send({
      success: true,
      message: "Hospital List",
      data: fetchHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Hospitals",
    });
  }
};


const admingethospitalController = async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const fetchHospital = await hospital.find({});
    res.status(200).send({
      success: true,
      message: "Hospital List",
      data: fetchHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Hospitals",
    });
  }
};

const admingetambulanceController = async (req, res) => {
  try {
    const fetchAmbulance = await ambulance.find({});
    res.status(200).send({
      success: true,
      message: "Ambulance List",
      data: fetchAmbulance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Ambulance",
    });
  }
};

const controllerPasswordUpdate = async (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRETKEY, async (err, decode) => {
    if (err) {
      return res.status(200).send({ message: "Auth Failed", success: false });
    } else {
      const userId = decode.id;
      const userFound = await controller.findOne({ _id: userId });
      if (userFound) {

        const password = req.body.password;
        const cPassword = req.body.cPassword;
        if (password === cPassword) {
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);
          const getCtrl = await controller.findOneAndUpdate(
            { _id: userId },
            { password: hashedPassword }
          );
          res.status(200).send({
            success: true,
            message: "Password changed successfully!",
            token: token,
          });
        } else {
          res.status(200).send({ success: false, message: 'user not found' })
        }
      } else {
        res
          .status(200)
          .send({ success: false, error: `Password didn't matched!` });
      }
    }
  });
};

const checkControllerLogin = async (req, res) => {
  const getUserDetail = await controller.findById({ _id: req.body.userId });
  if (getUserDetail) {
    res.status(200).send({ message: 'User Logged In', isController: true, userId: req.body.userId })
  } else {
    res.status(200).send({ message: 'User not found', isController: false })
  }
}

const addBookingController = async (req, res) => {
  try {
    const newAddBooking = await booking({ ...req.body });
    await newAddBooking.save();
    res.status(201).send({
      success: true,
      message: 'Booking Added Successfully',
      data: newAddBooking,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error While Applying For Booking'
    })
  }
}

const controllerLoginController = async (req, res) => {
  try {
    const user = await controller.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email Or Password", success: false });
    }
    req.session.user = user._id;
    req.session.OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    console.log(req.session.OTP)
    var maskedid = "";
    var myemailId = req.body.email;
    var index = myemailId.lastIndexOf("@");
    var prefix = myemailId.substring(0, index);
    var postfix = myemailId.substring(index);

    var mask = prefix.split('').map(function (o, i) {
      if (i < 2 || i >= (index - 2)) {
        return o;
      } else {
        return '*';
      }
    }).join('');
    maskedid = mask + postfix;
    res
      .status(200)
      .send({ message: `OTP sent succesfully to ${maskedid}`, success: true });
    sendMail(req.body.email, req.session.OTP)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in Login ${error.message}`,
    });
  }
}

const authController = async (req, res) => {
  try {
    const user = await controller.findById({ _id: req.body.userId });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User Not Found", success: false });
    } else {
      user.password = undefined;
      req.session.user = user._id
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

const controllerOTPController = async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp == req.session.OTP) {
      const token = jwt.sign({ id: req.session.user }, process.env.JWT_SECRETKEY, {
        expiresIn: "7d",
      });
      res.status(200).send({ message: "Login Successfully", success: true, token })
    } else {
      res.status(200).send({ message: "OTP invalid", success: false })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Error in Login ${err.message}`,
    });
  }
}

const deleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await controller.findByIdAndDelete(id);
    if (user) {
      res.status(202).send({ success: true, message: 'Controller Deleted Successfully' })
    }
    else {
      res.status(404).send({ success: false, message: 'User Not Found' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `ErrorWhile Deleting User`,
    });
  }
}



module.exports = {
  adminaddController,
  adminaddambulanceController,
  adminaddhospitalController,
  admingetallController,
  admingethospitalController,
  usergethospitalController,
  admingetambulanceController,
  controllerPasswordUpdate,
  checkControllerLogin,
  addBookingController,
  controllerLoginController,
  controllerOTPController,
  authController,
  checkControllerLogin,
  deleteController
};
