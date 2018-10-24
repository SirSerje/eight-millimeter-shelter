const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  watchOptions: {
    poll: 5000,
    ignored: ['public', 'server.js', 'postman', 'db']
  },
  devtool: 'eval-source-map',
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
              includePaths: ['./src/'],
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3867,
    proxy: {
      '/api': 'http://localhost:4125'
    },
    contentBase: "dist",
    stats: "errors-only",
    open: true
  }
};
