const path = require('path')
const extractTextPlugin = require("extract-text-webpack-plugin");
const mode = process.env.NODE_ENV;

const cssLoaders = 
  [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    }
  ]

let config = {
  entry: './src/Chouchoute.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
          fallback: 'style-loader',
          use: cssLoaders
        })
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...cssLoaders, 'sass-loader']
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|svg|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          },
          {
            loader: 'img-loader',
            options: { enabled: false }
          }
        ]
      }
    ]
  },
  plugins: [
    new extractTextPlugin({
      filename: 'application.min.css',
      disable: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    contentBase: path.resolve('./'),
    compress: true,
    historyApiFallback: true,
    port: 3210
  }
}

module.exports = config;