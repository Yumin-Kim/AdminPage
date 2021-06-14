const path = require("path");

module.exports = {
  mode: "production",
  resolve: {
    extensions: [".js", ".css", ".png", ".html"],
  },
  entry: "./index.html",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        options: {},
      },
      {
        test: /\.(css|png)?$/,
        include: [path.resolve(__dirname, "client", "css")],
        use: ["css-hot-loader", "style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
};
