const path = require('path')

const config = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    loaders: [
      { test: /.*\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  stats: 'errors-only',
}

module.exports = [config]
