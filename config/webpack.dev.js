
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')


const resolve = dir => path.join(__dirname, `../${dir}`)

const getStyleLoaders = key => {
  return [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugin: ['postcss-preset-env']
        }
      }
    },
    key
  ].filter(Boolean)
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'asset/[hash:4][ext][query]' // 静态资源 
  },

  module: {
    rules: [
      {
        oneOf: [
          // style 
          {
            test: /\.css$/,
            use: getStyleLoaders()
          },
          {
            test: /\.less$/,
            use: getStyleLoaders('less-loader')
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders('sass-loader')
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders('stylus-loader')
          },
          // 文件
          {
            test: /\.(jpe?g|png|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 1.024 * 1e4
              }
            }
          },
          {
            test: /\.svg$/,
            use: ['raw-loader']
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource'
          },

          // jsx 语法 
          {
            test: /\.jsx?$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              plugins: ['react-refresh/babel']
            }
          },
          {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname, '../src'),
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new ReactRefreshWebpackPlugin()
  ],

  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.json'],
    alias: {
      '@': resolve('src'),
      '@p': resolve('src/page')
    }
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    https: false,
    port: 3001,
    hot: true,
    compress: true,
    historyApiFallback: true
  }
}
