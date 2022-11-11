require('dotenv').config();
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const httpProxy = require('http-proxy-middleware');

const app = express();

const webpackConfig = require('../../webpack/webpack.config.js');

const configs = { env: process.env.NODE_ENV };
const devConfig = webpackConfig(configs);
// const devServerConfig = devConfig.devServer;
const compiler = webpack(devConfig);

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: devConfig.output.publicPath,
  writeToDisk: true,
  stats: {
    colors: true,
  },
  index: 'index.html',
});
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

const proxyHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': '*',
  'Access-Control-Allow-Methods': '*',
};

const proxyMiddleware = httpProxy.createProxyMiddleware('/api', {
  target: process.env.PROXY,
  pathRewrite: { '^/api/api': '/api', '^/api/api/v2': '/api/v2' },
  changeOrigin: true,
  onError(err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end(
      'Something went wrong. And we are reporting a custom error message.' + err
    );
  },
  headers: proxyHeader,
});

const assetsMiddleware = httpProxy.createProxyMiddleware('/uploads', {
  target: process.env.PROXY,
  pathRewrite: { '^/uploads': '/uploads' },
  changeOrigin: true,
  onError(err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end(
      'Something went wrong. And we are reporting a custom error message.' + err
    );
  },
  headers: proxyHeader,
});

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);
app.use('/api', proxyMiddleware);
app.use('/uploads', assetsMiddleware);

const staticFile = path.join(__dirname, '../', '../', '.webpack');

app.use(express.static(staticFile));

app.get('*', (req, res, next) => {
  const HTMLFILE = path.join(staticFile, 'index.html');
  res.sendFile(HTMLFILE, err => {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('listening on ' + port);
});
