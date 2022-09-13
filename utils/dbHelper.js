const User = require("../models/user");
const Shortlet = require("../models/shortlet");

exports.findUserByEmailAndUpdate = async (
  full_name,
  email,
  picture,
  access_token,
  id_token
) => {
  try {
    let [user, _] = await User.findByEmail(email);

    if (user[0] === undefined) {
      // console.log("USER does not exist", { exist: false, user: undefined });
      let user = new User(full_name, email, picture, access_token, id_token);
      user = await user.save();
      const [newUser, _] = await User.findByEmail(email);
      // console.log("CREATED A NEW USER", { exist: false, user: newUser[0] });
      return newUser;
    } else {
      const [updatedUser, _] = await User.UpdateAccessToken(
        access_token,
        id_token,
        email
      );
      return updatedUser;
    }
    // console.log("USER exist", { exist: true, user: user[0] });
  } catch (error) {
    console.log(error.message, "Error finding user from db");
    throw new Error(error.message);
  }
};

exports.createUser = async (full_name, email, picture) => {
  try {
    let user = new User(full_name, email, picture);
    user = await user.save();
    const [newuser, _] = await User.findByEmail(email);
    return newuser;
  } catch (error) {
    console.log("Error ====>", error.message);
    throw new Error(error.message);
  }
};

exports.findShortletById = async (shortletId) => {
  try {
    const [shortlet, _] = await Shortlet.findById(shortletId);
    return shortlet[0];
  } catch (error) {
    console.log("Error ====>", error.message);
    throw new Error(error.message);
  }
};

exports.findAllUser = async () => {
  try {
    const [shortlet, _] = await User.findAll();
    return shortlet[0];
  } catch (error) {
    console.log("Error ====>", error.message);
    throw new Error(error.message);
  }
};

exports.findbyRole = async (adminRole) => {
  try {
    const [shortlet, _] = await User.findbyRole(adminRole);
    return shortlet[0];
  } catch (error) {
    console.log("Error ====>", error.message);
    throw new Error(error.message);
  }
};

exports.findUserAccessTokenAndUpdate = async (name) => {
  try {
    let [user, _] = await User.findByEmail(email);

    if (user[0] === undefined) {
      console.log("USER does not exist", { exist: false, user: undefined });
      let user = new User(name, email, picture);
      user = await user.save();
      const [newUser, _] = await User.findByEmail(email);
      console.log("CREATED A NEW USER", { exist: false, user: newUser[0] });
      return newUser;
    }
    return user;
  } catch (error) {
    console.log(error, "Error finding user from db");
    throw new Error(error.message);
  }
};

exports.findUserByAccessToken = async (accessToken) => {
  try {
    const [user, _] = await User.findByToken(accessToken);
    return user[0];
  } catch (error) {
    console.log("Error ====>", error.message);
    throw new Error(error.message);
  }
};

exports.findUserById = async (userId) => {
  try {
    const [user, _] = await User.findById(userId);
    return user[0];
  } catch (error) {
    console.log("Error ====>", error.message);
    throw new Error(error.message);
  }
};

exports.findShortletAndUpdateById = async (
  shortletId,
  number_of_nights,
  userId
) => {
  try {
    const [shortlet, _] = await Shortlet.findShortletByIdAndUpdateAvailability(
      shortletId,
      number_of_nights,
      userId
    );
    return shortlet[0];
  } catch (error) {
    console.log("Error ====>", error.message);
    throw new Error(error.message);
  }
};
