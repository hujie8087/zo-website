import vue from '@vitejs/plugin-vue';

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js'],
    },
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:7001/',
            secrue: false,
            pathRewrite: {
                '^/api': '',
            },
        },
    },
};