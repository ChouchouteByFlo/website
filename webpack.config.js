const path = require("path")
const extractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const mode = process.env.NODE_ENV;

const cssLoaders = 
  [
    {
      loader: "css-loader",
      options: {
        importLoaders: 1
      }
    }
  ]

let config = {
  entry: "./src/Chouchoute.js",
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "")
  },
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: cssLoaders
        })
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [...cssLoaders, "sass-loader"]
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./dist/fonts/"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: { 
              limit: 8192, 
              outputPath: "./dist/images/"
            }
          },
          {
            loader: "img-loader",
            options: { 
              enabled: false,
              outputPath: "./dist/images/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new extractTextPlugin({
      filename: "application.min.css",
      disable: true
    }),
    new MinifyPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules")
    ]
  },
  devServer: {
    contentBase: path.resolve("./"),
    compress: true,
    historyApiFallback: true,
    port: 3210
  }
};

module.exports = config;