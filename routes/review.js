const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewOwner } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/reviews.js");

//REVIEWS ROUTE
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview))

//DELETE ROUTE
router.delete("/:reviewId", isLoggedIn, isReviewOwner, wrapAsync(deleteReview))

module.exports = router;