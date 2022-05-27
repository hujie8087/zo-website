/* eslint valid-jsdoc: "off" */

"use strict";

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
  config.keys = appInfo.name + "_1652114092165_4169";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mongoose = {
    url: "mongodb://119.28.7.148:27017", // mombzone 是数据库名
    options: {
      user: "root", // 数据库用户名
      pass: "admin123", // 数据库密码
      dbName: "mombzone", // 数据库名
    },
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
      secret: "dksIsGood@123!$",
    },
  };
};
