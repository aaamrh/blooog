const { resolve } = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: resolve(__dirname, './src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash:6].bundle.js',
    chunkFilename: 'js/[name].[contenthash:6].chunk.js'
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: resolve(__dirname, 'dist')
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3010',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', 
                  { 
                    "targets": {
                      "chrome": "68",
                      "ie": "11"
                    },
                    // 'useBuiltIns': 'usage' 
                  }
                ],
                ['@babel/preset-react', { 'runtime':'automatic' }],
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                // '@babel/plugin-transform-regenerator'
              ]
            },
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition:{
            maxSize : 100 * 1024 // 1M  100kb * 1024
          }
        },
        generator: {
          filename: 'images/[name][hash:6[ext]'
        },
      }
    ]
  },
  externals: {
    // react: 'React',
    axios: 'axios'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:5].css',
      chunkFilename: 'style/[name].[contenthash:5].chunk.css',
    }),
    new HtmlWebpackPlugin({
      title: '',
      filename: 'index.html',
      template: resolve(__dirname, './public/index.html')
    })
  ]
}

module.exports = config

