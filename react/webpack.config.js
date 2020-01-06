const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devServer: {
    quiet: true,
    hot: true,
    // enable HMR on the server
    compress: true,
    contentBase: path.resolve(__dirname, "./src"),
    // match the output path
    port: 8000,
    // host: _HOST,
    // publicPath: URL,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx", ".jsx"]
  },
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    // use absolute path
    // publicPath: '/',
    // path: path.join(__dirname, '../dist'),
    filename: "dist.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-react-jsx"]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html")
    })
  ]
};
