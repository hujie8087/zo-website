'use strict';
const BaseController = require('./base');
class GuanliController extends BaseController {
    async index() {
        const { ctx } = this;
        let ret = await ctx.model.Guanli.find({ is_show: true });
        this.success(ret);
    }
}

module.exports = GuanliController;