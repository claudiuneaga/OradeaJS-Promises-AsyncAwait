module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: __dirname + "/build/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "stage-0"]
        }
      }
    ]
  }
};
