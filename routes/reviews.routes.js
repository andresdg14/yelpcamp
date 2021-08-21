const router = require('express').Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews.controllers');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))
  
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;