const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/roadBlocks.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "bundle.js"
  }
};
