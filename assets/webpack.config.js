const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const publicPath = '/';
const destDir = path.resolve(__dirname, '..', 'priv', 'static');

const bourbon = require('bourbon');
const autoprefixer = require('autoprefixer');


module.exports = (env) => {
  const isDev = !(env && env.prod);
  const devtool = isDev ? 'eval' : 'source-map';

  return {
    devtool,

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

    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
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
          exclude: /node_modules/,
          use: isDev ? [{
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
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [bourbon.includePaths],
            },
          },
          ] : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader'],
          }),
        },
      ],
    },

    resolve: {
      modules: ['node_modules', __dirname],
      extensions: ['.js', '.json', '.jsx', '.css'],
    },
    plugins: isDev ? [
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
    ] : [
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

      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        beautify: false,
        comments: false,
        extractComments: false,
        compress: {
          warnings: false,
          drop_console: true,
        },
        mangle: {
          except: ['$'],
          screw_ie8: true,
          keep_fnames: true,
        },
      }),
    ],
  };
};
