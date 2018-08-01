'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);
// 自定义antd主题文件，位置位于src/static/antd/theme.less
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themer = lessToJs(fs.readFileSync(path.join(__dirname, '../src/static/antd/theme.less'), 'utf8'));

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('./polyfills'),
    // require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
    // 多页面打包配置
    // app: [
    //   require.resolve('./polyfills'),
    //   require.resolve('webpack/hot/dev-server'),
    //   require.resolve('react-dev-utils/webpackHotDevClient'),
    //   paths.appIndexJs
    // ]
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'fonts': paths.antIconPath,
      'react-native': 'react-native-web',
      // anujs conifgs
      'react': 'anujs',
      'react-dom': 'anujs',
      // For compatibility with IE please use the following configuration
      // 'react': 'anujs/dist/ReactIE',
      // 'react-dom': 'anujs/dist/ReactIE',
      // 'redux': 'anujs/lib/ReduxIE', /// This is mainly for IE6-8, because of the poor performance of the isPlainObject method in the official source code.
      // If you reference prop-types or create-react-class
      // Need to add the following alias
      'prop-types': 'anujs/lib/ReactPropTypes',
      'create-react-class': 'anujs/lib/createClass',
      // If you use the onTouchTap event on the mobile side
      'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ],
              cacheDirectory: true,
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-class-properties",
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                [
                  "import",
                  {
                    "libraryName": "antd",
                    "style": true
                  }
                ]
              ]
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            test: /\.less$/,
            include: /node_modules\/antd/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                  modifyVars: Object.assign(themer, {
                    '@iconfont-css-prefix': 'anticon',
                    '@icon-url': '"~fonts/iconfont"'
                  })// 配置本地离线图标地址
                }
              }
            ]
          },
          {
            test: /\.less$/,
            include: paths.appSrc,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[path]-[local]-[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourcemap: true,
                  browser: 'last 2 version'
                }
              },
              {
                loader: 'less-loader',
                options: { sourcemap: true }
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.ejs$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      title: 'React App',
      inject: true,
      template: paths.appHtml,
    }),
    // 多页面打包配置
    // new HtmlWebpackPlugin({
    //   chunks: ['app']
    //   inject: true,
    //   template: paths.appHtml,
    //   filename: 'app.html'
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
