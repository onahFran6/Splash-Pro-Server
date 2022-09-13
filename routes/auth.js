var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");

/**  Route  to /api/v1/oauth/google
 * @get   /
 *
 */

router.route("/").get(authController.getAuthAccessToken);

module.exports = router;
