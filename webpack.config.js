const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app_bundle.js',
    // publicPath: '/', // to allow multiple url parameters
    publicPath: 'dist',
  },
  devServer: {
    contentBase: './dist',
    open: true,
    historyApiFallback: true, // makes react-router-dom in devserver work
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // resolves `import {} from 'something';`
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
    }),
  ],
};

