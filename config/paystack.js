require("dotenv").config();

const paystack = (request) => {
  const pstk_secret = process.env.PSTK_SECRET_KEY;
  const MySecretKey = `Bearer ${pstk_secret}`;

  const initializePayment = (form, mycallback) => {
    const option = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        Authorization: MySecretKey,
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      form,
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const option = {
      url:
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
      headers: {
        Authorization: MySecretKey,
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(option, callback);
  };
  return { initializePayment, verifyPayment };
};

module.exports = paystack;
