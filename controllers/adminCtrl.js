const admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminRegisterController = async (req, res) => {
  try {
    const existingUser = await admin.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    console.log(password);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;
    const newUser = new admin(req.body);
    await newUser.save();
    req.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const adminLoginController = async (req, res) => {
  try {
    const user = await admin.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email Or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({ message: "Login Successfully", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in Login ${error.message}`,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await admin.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    } else {
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
  adminRegisterController,
  adminLoginController,
  authController,
};
