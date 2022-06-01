'use strict';
const BaseController = require('./base');
class TextTypeController extends BaseController {
    async index() {
        const { ctx } = this;
        let ret = await ctx.model.TextType.find();
        this.success(ret);
    }
}

module.exports = TextTypeController;