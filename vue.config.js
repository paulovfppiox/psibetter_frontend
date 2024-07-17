/*const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/psibetter/templates': {
        target: 'http://localhost:80',
        changeOrigin: true,
        pathRewrite: { '^/psibetter/templates': '/psibetter/templates' }
      },
    },
  },
});**/

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? 'http://paivaservices.com/psibetter/'
  : '/',
  
  // Definição de proxies, para driblar CROSS-ORIGIN erros
  devServer:    {
    proxy: {
        '/psibetter/psibetter_backend/':   {
            target: 'https://10.255.243.162:80/', // Replace with the API URL
            ws: true,
            changeOrigin: true
        }, 
		'/psibetter/templates': {
        target: 'http://localhost:80',
        changeOrigin: true,
        pathRewrite: { '^/psibetter/templates': '/psibetter/templates' }
      },
      '/psibetter/': {
        target: 'http://localhost',
        changeOrigin: true,
        pathRewrite: {
          '^/psibetter': '/psibetter'
        }
      }
    }
  }
})
