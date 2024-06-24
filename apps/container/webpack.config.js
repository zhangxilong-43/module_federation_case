const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {UniversalFederationPlugin} = require('@module-federation/node');

const host = "127.0.0.1";
const port = "9091";

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/index.jsx"),
    output: {
      filename: "static/js/[name].js", 
      path: path.join(__dirname, "./dist"), 
      clean: true,
      publicPath: process.env.PUBLICPATH,
      // publicPath: 'auto',

      // filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
      // path: path.join(__dirname, './dist'), // 打包结果输出路径
      // clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
      // publicPath: '/', // 打包后文件的公共前缀路径
      environment: {
        asyncFunction: true
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-react", {
                "runtime": "automatic"
              }]
            ]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    plugins: [
      new UniversalFederationPlugin({
        remoteType: 'script',
        isServer: true,
        name: 'container',
        useRuntimePlugin: true,
        library: {type: 'commonjs-module',},
        filename: 'remoteEntry.js',
      }),
      new HtmlWebpackPlugin({
        title: "micro-frontend-container",
        filename: "index.html",
        inject: true, // 自动注入静态资源
        hash: false,
        cache: false,
        // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
        template: path.join(__dirname, "./public/index.html"),
        // 压缩html资源
        // minify: {
        //   removeAttributeQuotes: true,
        //   collapseWhitespace: true, //去空格
        //   removeComments: true, // 去注释
        //   minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        //   minifyCSS: true, // 缩小CSS样式元素和样式属性
        // },
        nodeModules: path.resolve(__dirname, "./node_modules"),
      }),
    ],
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      host,
      port,
      open: true, // 是否自动打开
      compress: false, // gzip压缩,开发环境不开启，提升热更新速度
      hot: true, // 开启热更新
      // historyApiFallback: true, // 解决history路由404问题
      historyApiFallback:{
        index: '/'
      },
      static: {
        directory: path.join(__dirname, "./public"), // 托管静态资源public文件夹
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    }
};