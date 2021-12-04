require('@babel/register');
const dotenv = require('dotenv');
const path = require('path');

let envFile = '.env';
if (process.argv[2] === '--dev') {
  envFile = '.env.dev';
}

dotenv.config({
  path: path.join(__dirname, '..', '..', envFile),
});

process.env.NODE_ENV === 'dev'
  ? require('./server.dev')
  : require('./server.prod');
