module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.plugin('html').tap(options => {
      options[0].title = 'vue-zheye'
      return options
    })
  }
}
