module.exports = {
  devtool: "source-map",
  entry: "./src/index.ts",
  target: "node",
  output: {
    filename: "bundle.js",
    library: "delve",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  }
};
