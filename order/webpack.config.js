const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3002/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            sourceType: 'unambiguous',
            presets: [
              ['@babel/preset-env', { modules: 'commonjs' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'order',
      filename: 'remoteEntry.js',
      exposes: {
        './Order': './src/Order.jsx',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  resolve: { extensions: ['.js', '.jsx'] },
};
