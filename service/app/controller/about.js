'use strict';
const BaseController = require('./base');
class AboutController extends BaseController {
    async list() {
        const { ctx } = this;
        let ret = await ctx.model.About.findOne();
        let classify = await ctx.model.Classify.find({ classify_pid: 24 });
        this.success({ aboutInfo: ret, classifyList: classify });
    }
}

module.exports = AboutController;