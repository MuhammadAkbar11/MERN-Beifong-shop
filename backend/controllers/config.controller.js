import { PAYPAL_CLIENT_ID } from "../configs/constants.js";
import ResponseError from "../utils/responseError.js";
import axios from "axios";

export const getConvertCurrency = async (req, res) => {
  const amount = +req.query.amount;
  const fromCurr = req.query.fromCurr;
  const toCurr = req.query.toCurr;

  const uri = `https://api.exchangerate-api.com/v4/latest/USD`;
  try {
    const {
      data: { rates },
    } = await axios.get(uri);
    let fromRate = rates[fromCurr];
    let toRate = rates[toCurr];
    const result = ((toRate / fromRate) * amount).toFixed(2);
    res.json({
      status: true,
      result: result,
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(500, error);
  }
};

export const getPaypalId = (req, res) => {
  return res.json({
    client_id: PAYPAL_CLIENT_ID,
  });
};
