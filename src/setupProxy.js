const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function () {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://monkfish-app-hmwl9.ondigitalocean.app:8080/',
      changeOrigin: true,
    }),
  );
};
