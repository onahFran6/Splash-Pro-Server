require("dotenv").config();
const qs = require("qs");
const axios = require("axios");
const request = require("request");
var TokenProvider = require("refresh-token");
var GoogleTokenProvider = require("refresh-token").GoogleTokenProvider;

exports.getGoogleOAuthTokens = async (code) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // console.log("GET GOOGLE TOKEN ====>", { data: res.data });
    return res.data;
  } catch (error) {
    // console.error("Failed to fetch Google Oauth Tokens ", error);
    throw new Error(error.message);
  }
};

exports.getGoogleUser = async (id_token, access_token) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    // console.log("Error fetching Google user", error.message);
    throw new Error(error.message);
  }
};
