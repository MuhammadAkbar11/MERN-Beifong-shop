import { PAYPAL_CLIENT_ID } from "../configs/constants.js";
import convertCurrency from "../utils/convertCurrency.js";
import ResponseError from "../utils/responseError.js";

export const getConvertCurrency = (req, res) => {
  const amount = +req.query.amount;
  const fromCurr = req.query.fromCurr;
  const toCurr = req.query.toCurr;
  console.log(req.query);
  try {
    convertCurrency(amount, fromCurr, toCurr, (err, result) => {
      if (err) {
        throw new ResponseError(500, err);
      }
      return res.json({
        status: true,
        result,
      });
    });
  } catch (error) {
    console.log(err);
    throw new ResponseError(500, error);
  }
};

export const getPaypalId = (req, res) => {
  return res.json({
    client_id: PAYPAL_CLIENT_ID,
  });
};
