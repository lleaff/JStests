module.exports = {
  entry: [
    "./src/index.js"
  ],

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /.*\.js$/,
        exclude: /node_modules/
      }
    ]
  },

  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist'
  }
};
