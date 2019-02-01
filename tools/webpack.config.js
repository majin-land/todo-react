/* eslint-disable global-require, no-confusing-arrow, max-len */
require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { TARGET } = process.env
const ENV = process.env.NODE_ENV || 'development'
const isDebug = ENV !== 'production'

const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v')

const babelConfig = require('../babel.config.js')

const postcssConfig = require('./postcss.config.js')

const analyze = process.argv.includes('analyze') || false

const PORT = process.env.PORT || 3000

// Webpack configuration (index.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  target: 'web',

  mode: isDebug ? 'development' : 'production',

  // The base directory for resolving the entry option
  context: path.resolve(__dirname, '../src'),

  // The entry point for the bundle
  entry: [
    './index.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, '../public/dist'),
    publicPath: '/',
    filename: isDebug ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
    sourcePrefix: '  ',
  },

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __ENV__: `'${TARGET}'`,
      __UAT__: TARGET === 'uat',
      __PROD__: TARGET === 'prod',
      __VERSION__: JSON.stringify(require('../package.json').version),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      debug: isDebug,
      minimize: !isDebug,
    }),
    new Dotenv({
      path: isDebug ? './.env.local' : ((TARGET === 'prod') ? './.env.production' : './.env.uat'), // load this now instead of the ones in '.env'
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      favicon: '../public/favicon.ico',
      hash: isDebug,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDebug ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDebug ? '[id].css' : '[id].[hash].css',
    }),
  ],

  // Options affecting the normal modules
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
        options: { ...babelConfig, cacheDirectory: isDebug },
      },
      {
        test: /\.css$/,
        // only turn on standard global CSS loader for the material directories
        // These paths are the same as above and specific to your system, so change accordingly
        include: [
          path.resolve(__dirname, '../node_modules/@material'),
        ],
        use: [
          isDebug ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        // use css module for project scss
        test: /\.scss/,
        use: [
          isDebug ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
              importLoaders: true,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssConfig,
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3|csv)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
      },
    ],
  },

}

// Optimize the bundle in release (production) mode
if (!isDebug) {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
  }))
  config.optimization = {
    nodeEnv: 'production',
    minimize: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  }
}

if (analyze) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug) {
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client')
  config.plugins.push(new webpack.HashedModuleIdsPlugin())
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin())
  config.devServer = {
    host: '0.0.0.0',
    port: PORT,
    contentBase: path.resolve(__dirname, '../public/dist'),
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
  }
}

module.exports = config
