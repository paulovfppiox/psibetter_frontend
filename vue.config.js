const { defineConfig } = require('@vue/cli-service');

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
  
});

