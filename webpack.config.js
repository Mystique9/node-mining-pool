const path = require('path')

const config = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    loaders: [
      { test: /.*\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
    ],
  },
}

module.exports = [config]
