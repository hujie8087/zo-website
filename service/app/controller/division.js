'use strict';
const BaseController = require('./base');
class DivisionController extends BaseController {
    async index() {
        const { ctx } = this;
        let ret = await ctx.model.Division.find();
        this.success(ret);
    }
}

module.exports = DivisionController;