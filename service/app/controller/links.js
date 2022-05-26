'use strict';
const BaseController = require('./base');
class LinksController extends BaseController {
    async index() {
        const { ctx } = this;
        let ret = await ctx.model.Links.find().limit(6);
        this.success(ret);
    }
}

module.exports = LinksController;