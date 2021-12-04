require('dotenv').config();
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let HOT = false;

if (process.env.NODE_ENV === 'dev') {
  HOT = true;
}

const indexFile = HOT
  ? [
      path.resolve(__dirname, '../', 'src/index.js'),
      'webpack-hot-middleware/client',
    ]
  : path.resolve(__dirname, '../', 'src/index.js');

module.exports = {
  target: 'web',
  entry: {
    index: indexFile,
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx', '.json'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, '..', 'src'),
      '@app': path.resolve(__dirname, '..', 'src/app'),
      '@actions': path.resolve(__dirname, '..', 'src/app/actions'),
      '@reducers': path.resolve(__dirname, '..', 'src/app/reducers'),
      '@utils': path.resolve(__dirname, '..', 'src/app/utils'),
      '@hooks': path.resolve(__dirname, '..', 'src/app/hooks'),
      '@constants': path.resolve(__dirname, '..', 'src/app/constants'),
      '@screens': path.resolve(__dirname, '..', 'src/app/screens'),
      '@components': path.resolve(__dirname, '..', 'src/app/components'),
      '~bootstrap': path.resolve(__dirname, '..', 'node_modules/bootstrap'),
    },
  },
  stats: {
    colors: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              emitError: true,
              emitWarning: true,
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '..', 'src'),
        use: [
          process.env.NODE_ENV !== 'dev'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: resourcePath => resourcePath.endsWith('.module.css'),
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'dev'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: resourcePath => resourcePath.endsWith('.module.scss'),
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash][ext][query]',
        },
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: '[path][name].[hash].[ext]',
        //     context: 'src',
        //   },
        // },
      },
      {
        test: /\.(eot|gif|otf|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name]-[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Beifong Shop',
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
