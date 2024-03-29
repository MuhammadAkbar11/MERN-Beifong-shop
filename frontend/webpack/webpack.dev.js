const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  output: {
    path: path.resolve(__dirname, '../', '.webpack'),
    filename: 'js/[name].bundle-[contenthash].js',
    chunkFilename: 'js/chunk-[name]-[contenthash].js',
    assetModuleFilename: 'assets/[name]-[hash][ext][query]',
    publicPath: '/',
  },
  watchOptions: {
    ignored: '/node_modules/',
  },
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    hot: true,
    overlay: true,
    compress: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
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
        containers: {
          name: 'containers',
          test: /[\\/]containers[\\/]/,
          chunks: 'all',
        },
      },
    },
    runtimeChunk: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: 'chunk-[name]-[contenthash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
