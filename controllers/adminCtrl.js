const admin = require("./../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { sendMail } = require("./MailController");

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
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email Or Password", success: false });
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

const adminOTPController = async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp == req.session.OTP) {
      const token = jwt.sign(
        { id: req.session.user },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: "7d",
        }
      );
      res
        .status(200)
        .send({ message: "Login Successfully", success: true, token });
    } else {
      res.status(200).send({ message: "OTP invalid", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Error in Login ${err.message}`,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await admin.findById({ _id: req.body.userId });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User Not Found", success: false });
    } else {
      user.password = undefined;
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

const checkAdminLogin = async (req, res) => {
  const getUserDetail = await admin.findById({ _id: req.body.userId });
  if (getUserDetail) {
    res
      .status(200)
      .send({
        message: "User Logged In",
        isAdmin: true,
        userId: req.body.userId,
      });
  } else {
    res.status(200).send({ message: "User not found", isAdmin: false });
  }
};

module.exports = {
  adminRegisterController,
  adminLoginController,
  adminOTPController,
  authController,
  checkAdminLogin,
};
