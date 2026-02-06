const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  logger: {
    quiet: false,
    stats: true
  },
  h5: {
    devServer: {
      host: '0.0.0.0',
      port: 10086,
      allowedHosts: 'all'
    },
    webpackChain(chain) {
      // 使用 HtmlWebpackPlugin 自动生成 index.html
      chain.plugin('html').use(HtmlWebpackPlugin, [{
        template: './src/index.html',
        filename: 'index.html',
        inject: true,
        minify: false
      }])
    }
  }
}
