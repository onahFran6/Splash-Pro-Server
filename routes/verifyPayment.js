var express = require("express");
var router = express.Router();
var { verifyPayment } = require("../controllers/verifyPaymentController");

/**
 * Routes post to /payment
 *@get /api/v1/payment/callback  @query  {?reference }  To bookan Apartment and Initialized payment
 */
router.route("/").get(verifyPayment);

module.exports = router;
