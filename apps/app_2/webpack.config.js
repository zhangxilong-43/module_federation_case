const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
// const {UniversalFederationPlugin} = require('@module-federation/node');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const isDevelopment = !isProd;

const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  cache: false,
  devServer: {
    port: 3002,
    hot: isDevelopment,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.join(__dirname, './dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: 'http://localhost:3002/', // 打包后文件的公共前缀路径
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /.css$/, // 匹配 css 文件
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('@babel/preset-react')],
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },

  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'app_2',
      filename: 'remoteEntry.js',
      exposes: {
        './Page': './src/Page',
      },
      shared: {
        ...deps,
        'react-router-dom': {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        react: {
          singleton: true,
        },
      },
    }),
    // new UniversalFederationPlugin({
    //   remoteType: 'script',
    //   isServer: true,
    //   name: 'app_2',
    //   useRuntimePlugin: true,
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     './Page': './src/Page',
    //   }
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ].filter(Boolean),
};
