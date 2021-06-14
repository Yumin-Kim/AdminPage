module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".css"],
  },
  entry: "./src/compile.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
