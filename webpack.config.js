'use strict';

const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const _externals = require('externals-dependencies');

const nodeEnv = process.env.NODE_ENV || 'development';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  devtool: 'inline-source-map',
  entry: resolveApp('src/index.ts'),
  output: {
    path: resolveApp('build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({ configFile: resolveApp('tsconfig.json') })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: [resolveApp('src')],
        loader: require.resolve('eslint-loader'),
        options: {
          eslintPath: require.resolve('eslint')
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        include: [resolveApp('src')],
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-typescript')],
          plugins: [
            require.resolve('@babel/plugin-transform-runtime'),
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('@babel/plugin-proposal-object-rest-spread')
          ],
          cacheDirectory: true,
          cacheCompression: nodeEnv === 'production',
          compact: nodeEnv === 'production'
        },
      }
    ]
  },
  target: 'node',
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    __dirname: true,
    __filename: true
  },
  externals: _externals()
}
