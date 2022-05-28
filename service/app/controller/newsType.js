'use strict';
const BaseController = require('./base');
class NewsTypeController extends BaseController {
    async index() {
        const { ctx } = this;
        let ret = await ctx.model.NewsType.find();
        this.success(ret);
    }
}

module.exports = NewsTypeController;