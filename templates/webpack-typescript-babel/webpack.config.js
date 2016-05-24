module.exports = {
  entry: [
    "./src/index.ts"
  ],

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: 'awesome-typescript-loader?target=ES5&useBabel=true',
        test: /\.ts$$/,
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
  },

  devtool: 'source-map',

};
