'use strict';
const BaseController = require('./base');
class BannerController extends BaseController {
    async index() {
        const { ctx } = this;
        const { banner_id } = ctx.query;
        let ret = await ctx.model.Banner.findOne({ banner_id });
        this.success(ret);
    }
    async home() {
        const { ctx } = this;
        let ret = await ctx.model.Banner.find({ is_home: true });
        this.success(ret);
    }
}

module.exports = BannerController;