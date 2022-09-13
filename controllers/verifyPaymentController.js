const request = require("request");
const dbHelper = require("../utils/dbHelper");

const { initializePayment, verifyPayment } =
  require("../config/paystack")(request);

exports.verifyPayment = async (req, res) => {
  try {
    const ref = req.query.reference;
    if (ref === undefined || null) {
      return res.status(403).json({
        Error: [
          {
            message: ` req query reference  is  required  '`,
          },
        ],
      });
    }

    verifyPayment(ref, async (error, body) => {
      if (error) {
        console.log(error);
        return res.status(403).json({
          Error: [
            {
              message: ` Unable to verify payment '`,
            },
          ],
        });
      }
      const dataCallback = JSON.parse(body);

      console.log("shortlet ====>", {
        shortletId: dataCallback.data.metadata,
      });

      if (dataCallback.data.status === "success") {
        // on successful payment ,let make the apartment availability to be false
        const { apartmentId, userId, number_of_nights } =
          dataCallback.data.metadata;
        const shortlet = await dbHelper.findShortletAndUpdateById(
          parseInt(apartmentId),
          parseInt(number_of_nights),
          parseInt(userId)
        );

        res.json({
          message: "payment successful made",
          Apartment_name: dataCallback.data.metadata.apartment_name,
        });
      }
      res.json({
        message: "payment was not successful book ",
        status: dataCallback.status,
      });
    });
  } catch (error) {
    next(error);
  }
};
