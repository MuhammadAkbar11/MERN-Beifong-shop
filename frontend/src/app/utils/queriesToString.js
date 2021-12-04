const queriesToString = queries => {
  return Object.keys(queries)
    .map(key => `${key}=${queries[key]}`)
    .join('&');
};

export default queriesToString;
