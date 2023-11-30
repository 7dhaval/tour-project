const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();
const authController = require('../controllers/authController')

// router.param("id", tourController.checkID);

// Create a Checkbody Middleware function
//check if body contians the name and price property
//if not send back 400 (bad request)
//Add it to the post handler stack

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAlltours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(authController.protect, tourController.getAlltours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
