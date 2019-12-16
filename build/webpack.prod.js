const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'cookie-interceptor.js',
    library: 'cookieInterceptor',
    globalObject: "typeof self !== 'undefined' ? self : this",
    libraryTarget: 'umd'
  },
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};
