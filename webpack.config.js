const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //start point
  entry: "./src/index.js",
  //where result should be placed
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.css$/, /\.scss$/],
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader",
            options: {
              includePaths: ['./src/*'],
            },
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    // ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: "dist",
    stats: "errors-only",
    open: true
  }
};
