var express = require("express");
var router = express.Router();
var { getGoogleAuthURL } = require("../controllers/googleLoginController");

/**  Route  to /api/vi/googleLogin
 * @get /api/vi/googleLogin
 */

router.route("/").get(getGoogleAuthURL);

module.exports = router;
