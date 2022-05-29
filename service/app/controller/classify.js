'use strict';
const BaseController = require('./base');
class ClassifyController extends BaseController {
    async homeList() {
        const { ctx } = this;
        let classifyList = await ctx.model.Classify.find({ classify_pid: 24 });
        let servicesList = await ctx.model.Classify.find({ classify_pid: 81 });
        this.success({ classifyList, servicesList });
    }
}

module.exports = ClassifyController;