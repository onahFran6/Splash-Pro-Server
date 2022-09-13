const express = require("express");
const upload = require("../utils/multer");

const verifyTokenMiddleWare = require("../utils/verifyTokenMiddleWare");
var {
  getAllShortlets,
  createShortlet,
} = require("../controllers/shortletController");

const router = express.Router();

/**
 * Routes GET and POST to /shortlets/
 *@get /api/v1/shortlets  To Fetch 10 or Any number of row at a time
 *@post /api/v1/shortlets for Admin to upload new shortlets into the DB
 */
router
  .route("/")
  .get(verifyTokenMiddleWare.validateUser, getAllShortlets)
  .post(
    verifyTokenMiddleWare.validateUser,
    verifyTokenMiddleWare.verifyAdmin,
    upload.array("image", 2),
    createShortlet
  );
module.exports = router;
