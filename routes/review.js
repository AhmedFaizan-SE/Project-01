const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewConroller = require("../controllers/review.js");


// Post revivew

router.post("/", isLoggedIn, validateReview, wrapAsync( reviewConroller.createReview));
// Delete Review

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewConroller.delReview));


module.exports = router;