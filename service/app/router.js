'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;
    const jwt = app.middleware.jwt({ app });

    router.get('/', controller.home.index);

    router.get('/links', controller.links.index);

    router.group({ name: 'news', prefix: '/news' }, (router) => {
        let { create, detail, list, getBanner, prevNext, relative } =
        controller.news;
        router.post('/create', jwt, create);
        router.get('/:id', detail);
        router.get('/prevNext/:id', prevNext);
        router.get('/getBanner', getBanner);
        router.get('/relative/:id', relative);
        router.get('/', list);
    });
    router.group({ name: 'newsType', prefix: '/newsType' }, (router) => {
        let { index } = controller.newsType;
        router.get('/', index);
    });
    router.group({ name: 'markets', prefix: '/markets' }, (router) => {
        let { create, detail, list, getBanner, prevNext, relative } =
        controller.markets;
        router.post('/create', jwt, create);
        router.get('/:id', detail);
        router.get('/prevNext/:id', prevNext);
        router.get('/getBanner', getBanner);
        router.get('/relative/:id', relative);
        router.get('/', list);
    });
    router.group({ name: 'marketsType', prefix: '/marketsType' }, (router) => {
        let { index } = controller.marketsType;
        router.get('/', index);
    });
    router.group({ name: 'about', prefix: '/about' }, (router) => {
        let { list } = controller.about;
        router.get('/', list);
    });
    router.group({ name: 'contact', prefix: '/contact' }, (router) => {
        let { getBanner, getList } = controller.contact;
        router.get('/getBanner', getBanner);
        router.get('/getList', getList);
    });
    router.group({ name: 'banner', prefix: '/banner' }, (router) => {
        let { index } = controller.banner;
        router.get('/', index);
    });
    router.group({ name: 'products', prefix: '/products' }, (router) => {
        let { create, detail, list, getBanner, prevNext, relative } =
        controller.products;
        router.post('/create', jwt, create);
        router.get('/:id', detail);
        router.get('/prevNext/:id', prevNext);
        router.get('/getBanner', getBanner);
        router.get('/relative/:id', relative);
        router.get('/', list);
    });
    router.group({ name: 'division', prefix: '/division' }, (router) => {
        let { index } = controller.division;
        router.get('/', index);
    });
};