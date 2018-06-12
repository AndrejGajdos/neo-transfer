const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
console.log(`target event is ${TARGET}`);

let outputFileName = 'app';
outputFileName += TARGET === 'prod' ? '.min.js' : '.js';

const common = {
  entry: ['babel-polyfill', './index.jsx'],
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new WebpackNotifierPlugin(),
  ],
  resolve: {
    modules: [
      path.resolve('.'),
      path.resolve('script'),
      path.resolve('script', 'views'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
};

if (TARGET === 'build' || !TARGET) {
  module.exports = webpackMerge(common, {
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: outputFileName,
      sourceMapFilename: '[file].map',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.less$/,
          loaders: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|ttf|svg|gif|png|jpg|otf|woff|woff2)$/,
          loader: 'url-loader',
        },
      ],
    },
    watchOptions: {
      poll: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'neon-js',
        template: 'index-template.ejs',
      }),
    ],
  });
}

if (TARGET === 'prod' || !TARGET) {
  module.exports = webpackMerge(common, {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: outputFileName,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.less$/,
          loaders: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
        {
          test: /\.(eot|ttf|svg|gif|png|jpg|otf|woff|woff2)$/,
          loader: 'file-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new HtmlWebpackPlugin({
        title: 'neon-js',
        template: 'index-template.ejs',
      }),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
        exclude: [/\.min\.js$/gi], // skip pre-minified libs
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0,
      }),
    ],
  });
}

if (TARGET === 'dev' || !TARGET) {
  module.exports = webpackMerge(common, {
    devtool: 'eval-source-map',
    output: {
      filename: 'bundle.js',
      sourceMapFilename: '[file].map',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.less$/,
          loaders: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|ttf|svg|gif|png|jpg|otf|woff|woff2)$/,
          loader: 'url-loader',
        },
      ],
    },
    devServer: {
      contentBase: path.resolve(__dirname), // New
      historyApiFallback: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      new FriendlyErrorsWebpackPlugin(),
      // new DuplicatePackageCheckerPlugin(),
    ],
  });
}
