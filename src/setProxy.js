const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/user-service',
        createProxyMiddleware({
            target: 'http://localhost:8600/',
            changeOrigin: true,
        })
    );
    app.use(
        '/database-service',
        createProxyMiddleware({
            target: 'http://localhost:8600/',
            changeOrigin: true,
        })
    );
    app.use(
        '/apporder-service',
        createProxyMiddleware({
            target: 'http://localhost:8600/',
            changeOrigin: true,
        })
    );
    app.use(
        '/storage-service',
        createProxyMiddleware({
            target: 'http://localhost:8600/',
            changeOrigin: true,
        })
    );
    app.use(
        '/container-service',
        createProxyMiddleware({
            target: 'http://localhost:8600/',
            changeOrigin: true,
        })
    );
};
