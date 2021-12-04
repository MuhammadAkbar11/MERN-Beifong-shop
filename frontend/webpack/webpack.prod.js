const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../', 'build'),
    filename: 'js/[name].[contenthash].bundle.js',
    chunkFilename: 'js/chunk-[name].[contenthash].js',
    publicPath: './',
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: true,
        },
      }),
    ],
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        components: {
          name: 'components',
          test: /[\\/]components[\\/]/,
          chunks: 'all',
        },
        screens: {
          name: 'screens',
          test: /[\\/]screens[\\/]/,
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].prod.[contenthash].css',
      chunkFilename: 'css/chunk-[name].prod.[contenthash].css',
    }),
  ],
};
