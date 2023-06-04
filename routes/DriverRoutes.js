const express = require("express");
const AuthMiddleWare = require("../middlewares/AuthMiddleWare");
const {
  checkLogin,
  authController,
  driverLoginController,
  driverOTPController,
  updateAmbulanceLocation,
  accpetBookingRequest,
  getAllBookings,
} = require("../controllers/driverCtrl");
const router = express.Router();

router.get("/check-login", AuthMiddleWare, checkLogin);

router.get("/getUserData", AuthMiddleWare, authController);

router.post("/driver-login", driverLoginController);

router.post("/driver-otp", driverOTPController);

router.post(
  "/update-ambulance-location",
  AuthMiddleWare,
  updateAmbulanceLocation
);

router.post("/update-booking-status", AuthMiddleWare, accpetBookingRequest);

router.get("/get-all-current-bookings", getAllBookings);

module.exports = router;
