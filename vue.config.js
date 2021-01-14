'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '../',
  outputDir: 'authen-docker',
  assetsDir: 'static',
  lintOnSave: false,
  pages: {
    authentication: {
      entry: 'src/views/authentication/index.js',
      template: 'public/index.html',
      filename: 'faceVerificationf/index.html',
      title: '人脸认证'
    },
    disburse: {
      entry: 'src/views/disburse/index.js',
      template: 'public/index.html',
      filename: 'disbursef/index.html',
      title: '支用签章'
    },
    ukFace: {
      entry: 'src/views/ukFace/index.js',
      template: 'public/index.html',
      filename: 'ukFace/index.html',
      title: '法人人脸'
    }
  },
  devServer: {
    port: 7899,
    open: true,
    openPage: 'authentication/index.html',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://e.etest.tf.cn:30010/ecloud/authentication/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/ukms': {
        target: 'http://e.etest.tf.cn:30010/ecloud/',
        // target: 'https://e.etest.tf.cn:4443/ecloud/ukms/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    name: '对公开户人脸认证',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          data: `@import "@/style/color.less";`,
          modifyVars: {
            hack: `true; @import "@/style/resetStyle.less";`
          }
        }
      }
    }
  }
}
