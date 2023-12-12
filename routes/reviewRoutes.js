const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("./../controllers/authController");

const router = express.Router({
  mergeParams: true,
});

router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .delete(authController.restrictTo("user"), reviewController.deleteReview)
  .patch(authController.restrictTo("user"), reviewController.updateReview)
  .get(reviewController.getReview);

module.exports = router;
