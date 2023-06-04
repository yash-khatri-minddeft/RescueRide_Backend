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
  changeAmbulanceStatus,
  updateBookingAndAmbulancestatus,
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

router.post("/get-all-current-bookings", AuthMiddleWare, getAllBookings);

router.post('/change-ambulance-availibility', AuthMiddleWare, changeAmbulanceStatus);

router.post('/change-booking-ambulance-status', AuthMiddleWare, updateBookingAndAmbulancestatus);
module.exports = router;
