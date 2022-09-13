const Shortlet = require("../models/shortlet");
const cloudinary = require("../utils/cloudinary");
var { paginatedResults } = require("../utils/paginationMiddleware");
const fs = require("fs");

exports.getAllShortlets = async (req, res, next) => {
  try {
    let limitNum = req.query.limit;
    let pageNum = req.query.page;

    if (!limitNum && !pageNum) {
      return res.status(403).json({
        Error: [
          {
            message: `limit and page are required parameter '`,
          },
        ],
      });
    }
    const [shortlets, _] = await Shortlet.findAll();
    const resultShortlets = paginatedResults(shortlets, limitNum, pageNum);
    res.status(200).json({ shortlets: resultShortlets });
  } catch (error) {
    next(error);
  }
};

exports.createShortlet = async (req, res, next) => {
  try {
    let { apartment_name, state, number_of_rooms, amount_per_night, address } =
      req.body;

    if (
      !apartment_name &&
      !state &&
      !number_of_rooms &&
      !amount_per_night &&
      !address
    ) {
      return res.status(403).json({
        Error: [
          {
            message: `ALL the req.body are not inputed correctly '`,
          },
        ],
      });
    }

    // cloudinary  Image Upload
    var urls = [];
    const files = req.files;
    for (const file of files) {
      let { path } = file;
      let result = await cloudinary.v2.uploader.upload(path);
      urls.push(result.secure_url);
    }

    const bedroom_image_url = urls[0];
    const bathroom_image_url = urls[1];

    let shortlet = new Shortlet(
      apartment_name,
      state,
      parseInt(number_of_rooms),
      parseInt(amount_per_night),
      address,
      bedroom_image_url,
      bathroom_image_url
    );
    shortlet = await shortlet.save();
    res.status(201).json({ message: "Shortlet created successfully " });
  } catch (error) {
    next(error);
  }
};

// exports.getPostById = async (req, res, next) => {
//   try {
//     const postId = req.params.id;

//     const [post, _] = await Post.findById(postId);
//     res.status(200).json({ post });
//   } catch (error) {
//     next(error);
//   }
// };
