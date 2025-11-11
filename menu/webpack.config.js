const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3001/',
    clean: true,
    assetModuleFilename: 'images/[name][hash][ext][query]'
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
      // <<< NOVO: suporte a imagens locais >>>
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'menu',
      filename: 'remoteEntry.js',
      exposes: {
        './Menu': './src/Menu.jsx',
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
