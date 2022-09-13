const dbHelper = require("../utils/dbHelper");

var FormData = require("form-data");
const axios = require("axios");
const request = require("request");

const { initializePayment } = require("../config/paystack")(request);

exports.payment = async (req, res, next) => {
  try {
    let userId = req.userId;
    let shortletId = req.params.shortletId;
    let { number_of_nights } = req.body;

    if (!shortletId && !number_of_nights) {
      return res.status(403).json({
        Error: [
          {
            message: ` req params  shortletId  and req.body.number_of_nights are  required  '`,
          },
        ],
      });
    }

    const user = await dbHelper.findUserById(userId);

    const shortlet = await dbHelper.findShortletById(shortletId);

    if (!shortlet) {
      res.status(401).json({
        errors: [
          {
            message: `Apartment with the id  of ${shortletId} does not exist`,
          },
        ],
      });
    }

    // console.log("shortlet ====>", { shortletId: shortlet, userId: userId });

    //check if the shortlet is currently available
    if (shortlet.available !== 1) {
      res.status(401).json({
        errors: [
          {
            message:
              "Apartment not currently available,Pick another one of our apartment",
          },
        ],
      });
    }

    // initializePayment by paystack
    const totalAmount = number_of_nights * shortlet.amount_per_night;
    var form = new FormData();
    form.metadata = {
      full_name: user.full_name,
      apartment_name: shortlet.apartment_name,
      userId: userId,
      apartmentId: shortlet.id,
      number_of_nights: number_of_nights,
    };
    form.amount = totalAmount;
    form.email = user.email;
    form.amount *= 100; //convert the amount to kobo

    initializePayment(form, (error, body) => {
      if (error) {
        console.log(error);
        return;
      }
      const paymentDetails = JSON.parse(body);

      // console.log("shortlet ====>", {
      //   metadata: paymentDetails.data,
      // });

      if (paymentDetails.status) {
        res.send({
          url: paymentDetails.data.authorization_url,
          reference: paymentDetails.data.reference,
          message: "Payment is Initialize",
        });
      }
    });
  } catch (error) {
    next(error.message);
  }
};
