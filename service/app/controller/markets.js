'use strict';
const BaseController = require('./base');
class MarketsController extends BaseController {
    async index() {
        const { ctx } = this;
        let ret = await ctx.model.Markets.find().limit(6);
        this.success(ret);
    }
}

module.exports = MarketsController;