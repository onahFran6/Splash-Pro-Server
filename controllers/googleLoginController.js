var googleOauth = require("../utils/googleOauth");

/**
 * Google Login  Controller for Routing
 * There are one routes for login
 */
exports.getGoogleAuthURL = async (req, res, next) => {
  const getGoogleAuthURL = googleOauth.getGoogleAuthURL();
  res.json({
    LoginUrl: getGoogleAuthURL,
  });
};

exports.testGoogleAuthURL = async (req, res, next) => {
  console.log("testGoogleAuthURL");
  res.json({ message: "test controller" });
};
