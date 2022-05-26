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
        let { create, detail, list } = controller.news;
        router.post('/create', jwt, create);
        router.get('/:id', detail);
        router.get('/', list);
    });
    router.group({ name: 'about', prefix: '/about' }, (router) => {
        let { list } = controller.about;
        router.get('/', list);
    });
};