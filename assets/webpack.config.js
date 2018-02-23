const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');

const publicPath = 'http://localhost:4001/';

const env = process.env.MIX_ENV || 'dev';
const prod = env === 'prod';

const entry = './js/App';

const hot = `webpack-hot-middleware/client?path=${publicPath}__webpack_hmr`;

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: env === 'dev',
  }),
];

if (env === 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [hot, entry],
  output: {
    crossOriginLoading: 'anonymous',
    path: '/',
    filename: 'index.bundle.js',
    publicPath,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        loaders: [
          'file-loader?name=images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff2?|eot|svg)$/,
        exclude: /node_modules/,
        query: { name: 'fonts/[hash].[ext]' },
        loader: 'file-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          },
        },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
