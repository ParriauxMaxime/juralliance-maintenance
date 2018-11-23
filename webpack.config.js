const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: `${__dirname}/src/client`,
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    // entry: 'src/client/index.html',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};
