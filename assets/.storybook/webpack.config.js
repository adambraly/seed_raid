// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const bourbon = require('bourbon');
const autoprefixer = require('autoprefixer');


module.exports = {
  plugins: [
    // your custom plugins

  ],
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        exclude: /node_modules/,
        use:[{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                }
            }, {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  options: {
                      plugins: [
                        autoprefixer,
                      ]
                  }
                }
            }, {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: [bourbon.includePaths]
              }
            }
          ],
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
    ],
  },
};
