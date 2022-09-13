require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY_JWT;
const userPermission = process.env.USER_PERMISSION;

const getGoogleOauthToken = require("../utils/getGoogleOauthToken");
const dbHelper = require("./dbHelper");

exports.validateUser = async (req, res, next) => {
  try {
    const accessToken = req.header("google-access-token");

    if (accessToken === null || undefined) {
      return res.status(403).send("A token is required for authentication");
    }

    // console.log(`User detail ====> `, { token: accessToken });

    let user = await dbHelper.findUserByAccessToken(accessToken);
    if (user === undefined) {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid access token" }] });
    }
    req.userId = user.id;
    return next();
  } catch (err) {
    return res.status(401).json({ errors: err.message });
  }
};

exports.verifyAdmin = async (req, res, next) => {
  try {
    let user = await dbHelper.findUserById(req.userId);
    console.log(`User detail ====> `, {
      user: user.role,
      admin: userPermission,
    });
    if (user.role !== userPermission) {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid access token" }] });
    }
    next();
  } catch (error) {
    return res.status(401).json({ errors: err.message });
  }
};
