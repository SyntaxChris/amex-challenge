const S3Plugin = require('webpack-s3-plugin')
const webpack = require('webpack')
const path = require('path')
const config = {
  devServer: {
    historyApiFallback: true,
    port: 3005
  },
  entry: ['babel-polyfill', './src/index.js'],
  plugins: [],
  module: {
    rules: []
  },
  resolve: {
    extensions: [ '*', '.js', '.jsx', '.json', '.scss' ]
  }
}

// Optimizations
// ------------------------------------
if (process.env.NODE_ENV === 'production') {
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new UglifyJsPlugin()
  ) 
}

// Bundle Output
// ------------------------------------
config.output = {
  filename   : `[name].[hash].js`,
  path: path.join(__dirname, 'dist'),
  publicPath: '/'
}

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
})

// HTML Template
// ------------------------------------
const HtmlWebPackPlugin = require('html-webpack-plugin')

config.module.rules.push({
  test: /\.html$/,
  use: [
    {
      loader: 'html-loader',
      options: { minimize: true }
    }
  ]
})
config.plugins.push(new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
}))

// Styles
// ------------------------------------
const autoPrefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const extractStyles = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css'
})

config.module.rules.push({
  test: /\.(sass|scss)$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { autoprefixer: false, sourceMap: true, importLoaders: 1 }
    },
    { loader: 'postcss-loader'},
    { loader: 'sass-loader' }
  ]
})
config.plugins.push(extractStyles, autoPrefixer)

// Asset deployment
// ------------------------------------
if (process.env.NODE_ENV === 'production') {
  const s3Config = (bucket) => {
    return new S3Plugin({
      directory: 'dist',
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      },
      s3UploadOptions: {
        Bucket: bucket
      }
    })
  }
  config.plugins.push(
    s3Config('chrislehneis.com'),
    s3Config('www.chrislehneis.com')
  )
}

// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : { limit : 8192 }
})

module.exports = config