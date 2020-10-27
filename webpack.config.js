/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');
/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

  entry: {
    extension: './src/extension.ts',
  }, // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: { // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'out'),
    filename: '[name].js',
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  devtool: 'source-map',
  externals: {
    vscode: "commonjs vscode" // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: { // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/node_modules\/min-dom\/dist\/index.esm.js/, '../../../min-dom.js')
  ],
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, path.join('src', 'test')),
      ],
      use: [{
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            "module": "es6" // override `tsconfig.json` so that TypeScript emits native JavaScript modules.
          }
        }
      }]
    }]
  },
}

module.exports = [config, {
  target: 'web', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

  entry: {
    propertyPanel: './node_modules/bpmn-js-properties-panel/index.js'
  }, // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: { // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'out'),
    filename: '[name].js',
    library: 'PropertyPanel',
    libraryTarget: "var",
  },

}, {
    target: 'web', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

    entry: {
      propertyProvider: './node_modules/bpmn-js-properties-panel/lib/provider/camunda/index.js'
    }, // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: { // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
      path: path.resolve(__dirname, 'out'),
      filename: '[name].js',
      library: 'PropertyProvider',
      libraryTarget: "var",
    },

  }

];