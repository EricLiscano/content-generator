const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// import vuetyfy plugin from modules
const { VuetifyPlugin } = require('webpack-plugin-vuetify/dist/plugin');

module.exports = (env, options) => {
  const isDevMode = options.mode !== 'production';

  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.ts'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      fallback: {
        "process": require.resolve("process/browser"),
        "crypto":false,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.test\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [
                'vue-style-loader',
                {
                  loader: 'cache-loader',
                  options: {
                    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/vue-loader'),
                    cacheIdentifier: '.cache',
                  },
                },
                'css-loader',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/css-loader'),
                cacheIdentifier: 'css',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true,
          },
        },
      }),
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
        extractComments: false,
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([{ from: 'public', to: 'public' }])
    ],
  };
};
