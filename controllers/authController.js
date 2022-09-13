const getGoogleOauthToken = require("../utils/getGoogleOauthToken");
const dbHelper = require("../utils/dbHelper");
const User = require("../models/user");
require("dotenv").config();

/**
 * Google Oauth2 Authentication  Controller for Routing
 * getAuthAccessToken is used to return a json object containing the the Access Token
 */

exports.getAuthAccessToken = async (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    return res.status(403).json({
      Error: [
        {
          message: `verification code pass as query parameter is required @/?code='samplecode'`,
        },
      ],
    });
  }

  const accessTokenCookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
  };

  try {
    // get the id and access token with the code
    const { id_token, access_token, refresh_token } =
      await getGoogleOauthToken.getGoogleOAuthTokens(code);

    // get user detail from google with tokens
    const googleUser = await getGoogleOauthToken.getGoogleUser(
      id_token,
      access_token
    );

    if (!googleUser.verified_email) {
      return res.status(403).json({
        Error: [
          {
            message: "Google account is not verified",
          },
        ],
      });
    }

    let { name, email, picture } = googleUser;

    /**
     * find if the email already exist
     * and update if it does or create a new user
     * create user in the db todo
     * */
    const { user } = await dbHelper.findUserByEmailAndUpdate(
      name,
      email,
      picture,
      refresh_token,
      id_token
    );
    // set cookies
    res.cookie("accessToken", access_token, accessTokenCookieOptions);
    res.status(200).json({
      message: "User Authentication successful",
      refresh_token: refresh_token,
    });
  } catch (error) {
    // console.log("ERROR", error.message);
    next(error);
  }
};
