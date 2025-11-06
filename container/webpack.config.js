const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3000/',
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
      name: 'container',
      remotes: {
        menu: 'menu@http://localhost:3001/remoteEntry.js',
        order: 'order@http://localhost:3002/remoteEntry.js',
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
