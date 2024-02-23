const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/rafi.ph',
    createProxyMiddleware({
      target: 'http://20.188.123.92:3000/',
      changeOrigin: true,
    })
  );
};

