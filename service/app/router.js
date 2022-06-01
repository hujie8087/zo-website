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
        let { create, detail, list, getBanner, prevNext, relative, homeList } =
        controller.news;
        router.get('/homeList', homeList);
        router.post('/create', jwt, create);
        router.get('/:id', detail);
        router.get('/prevNext/:id', prevNext);
        router.get('/getBanner', getBanner);
        router.get('/relative/:id', relative);
        router.get('/', list);
    });
    router.group({ name: 'message', prefix: '/message' }, (router) => {
        let { create, list } = controller.message;
        router.post('/create', create);
        router.get('/', list);
    });
    router.group({ name: 'newsType', prefix: '/newsType' }, (router) => {
        let { index } = controller.newsType;
        router.get('/', index);
    });
    router.group({ name: 'markets', prefix: '/markets' }, (router) => {
        let { create, detail, list, getBanner, prevNext, relative, homeList } =
        controller.markets;
        router.get('/homeList', homeList);
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
        let { index, home } = controller.banner;
        router.get('/', index);
        router.get('/home', home);
    });
    router.group({ name: 'products', prefix: '/products' }, (router) => {
        let { create, detail, list, getBanner, prevNext, relative, homeList } =
        controller.products;
        router.get('/homeList', homeList);
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
    router.group({ name: 'classify', prefix: '/classify' }, (router) => {
        let { homeList } = controller.classify;
        router.get('/homeList', homeList);
        router.get('/', homeList);
    });
    router.group({ name: 'sustainability', prefix: '/sustainability' },
        (router) => {
            let { index, typeList } = controller.sustainability;
            router.get('/typeList', typeList);
            router.get('/', index);
        }
    );
    router.group({ name: 'guanli', prefix: '/guanli' }, (router) => {
        let { index } = controller.guanli;
        router.get('/', index);
    });
    router.group({ name: 'imgPic', prefix: '/imgPic' }, (router) => {
        let { index } = controller.imgPic;
        router.get('/', index);
    });
    router.group({ name: 'textI', prefix: '/textI' }, (router) => {
        let { index, detail, prevNext, relative } = controller.textI;
        router.get('/prevNext/:id', prevNext);
        router.get('/relative/:id', relative);
        router.get('/:id', detail);
        router.get('/', index);
    });
    router.group({ name: 'textType', prefix: '/textType' }, (router) => {
        let { index } = controller.textType;
        router.get('/', index);
    });
};