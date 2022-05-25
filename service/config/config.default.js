/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1652114092165_4169';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/mombzone', // rs 是数据库名
        options: {},
    };

    return {
        ...config,
        ...userConfig,
        security: {
            csrf: {
                enable: false,
            },
        },
        jwt: {
            secret: 'KkbIsGood@123!$',
        },
    };
};