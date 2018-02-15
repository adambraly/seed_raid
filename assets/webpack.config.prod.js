const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const publicPath = '/';
const destDir = path.resolve(__dirname, '..', 'priv', 'static');


const autoprefixer = require('autoprefixer');


module.exports = () => {
  return {
    devtool: 'cheap-module-source-map',

    context: __dirname,

    entry: {
      app: [
        'js/App.jsx',
      ],
    },
    output: {
      path: destDir,
      filename: 'js/[name].js',
      publicPath,
    },
    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            }, {
              loader: 'postcss-loader',
              options: {
                options: {
                  plugins: [
                    autoprefixer,
                  ],
                },
              },
            },
            ],
          }),
        },
      ],
    },

    resolve: {
      modules: ['node_modules', __dirname],
      extensions: ['.js', '.json', '.jsx', '.css'],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new CopyWebpackPlugin([{
        from: './static',
        to: path.resolve(__dirname, '../priv/static'),
      }]),

      new ExtractTextPlugin({
        filename: 'css/[name].css',
        allChunks: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        beautify: false,
        comments: false,
        extractComments: false,
        compress: {
          warnings: false,
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
      }),
    ],
  };
};
