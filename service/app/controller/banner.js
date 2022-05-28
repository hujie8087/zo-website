'use strict';
const BaseController = require('./base');
class BannerController extends BaseController {
    async index() {
        const { ctx } = this;
        const { banner_id } = ctx.query;
        let ret = await ctx.model.Banner.findOne({ banner_id });
        this.success(ret);
    }
}

module.exports = BannerController;