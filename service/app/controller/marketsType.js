'use strict';
const BaseController = require('./base');
class MarketsTypeController extends BaseController {
    async index() {
        const { ctx } = this;
        let ret = await ctx.model.MarketsType.find();
        this.success(ret);
    }
}

module.exports = MarketsTypeController;