
module.exports = {
  transpileDependencies: ['vuetify'],
  filenameHashing: false,
  devServer: {
    allowedHosts: ['localhost', 'localhost:3000'],
    liveReload: true,
    host: 'localhost',
    hot: true,
    port: 8080,
  },
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
};
