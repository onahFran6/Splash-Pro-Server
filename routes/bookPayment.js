var express = require("express");
var router = express.Router();
var { payment } = require("../controllers/bookPaymentController");
const verifyTokenMiddleWare = require("../utils/verifyTokenMiddleWare");

/**
 * Routes post to /bookPayment
 *@post /api/v1/bookPayment/  @params {:shortletId }  To bookan Apartment and Initialized payment
 */
router.route("/:shortletId").post(verifyTokenMiddleWare.validateUser, payment);

module.exports = router;
