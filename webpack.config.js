const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFiles: ['index', 'default'],
    alias: {
      "@": path.join(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: 'imgs/[name][hash: 4][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Music',
      template: './public/index.html',
      filename: 'index.html'
    }),
    new ReactRefreshWebpackPlugin()
  ]
}