import axios from 'axios';
import React from 'react';

const useConvertCurrency = ({ amount, fromCurrency, toCurrency }) => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    const getCurrency = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/config/currency?amount=${amount}&fromCurr=${fromCurrency}&toCurr=${toCurrency}`
        );
        setValue(data.result);
        setLoading(false);
      } catch (error) {
        setErr(error);
        setLoading(false);
      }
    };

    getCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return [value, loading, err];
};

useConvertCurrency.defaultProps = {
  from: 'IDR',
  to: 'USD',
};

export default useConvertCurrency;
