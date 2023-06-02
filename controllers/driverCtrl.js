const ambulance = require("../models/AmbulanceModel")
const bcrypt = require("bcryptjs");

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
}


const authController = async (req, res) => {
  try {
    const user = await ambulance.findById({ _id: req.body.userId });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User Not Found", success: false });
    } else {
      user.password = undefined;
      req.session.user = user._id;
      user.name = user.driverName;
      user.driverName = undefined;
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

module.exports = {
  checkLogin,
  authController
}