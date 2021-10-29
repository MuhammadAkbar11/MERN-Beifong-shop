import https from "https";

const convertCurrency = async (amount, fromCurrency, toCurrency, cb) => {
  const apiKey = process.env.CONVERT_CURR_CLIENT_ID;

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = fromCurrency + "_" + toCurrency;
  const url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${apiKey}`;
  https
    .get(url, function (res) {
      let body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        try {
          const jsonObj = JSON.parse(body);

          const val = jsonObj[query];
          if (val) {
            const total = val * amount;
            const result = Math.round(total * 100) / 100;

            cb(null, result);
          } else {
            const err = new Error("Value not found for " + query);

            cb(err);
          }
        } catch (e) {
          cb(e);
        }
      });
    })
    .on("error", function (e) {
      cb(e);
    });
};

export default convertCurrency;
