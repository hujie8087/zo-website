'use strict';
const BaseController = require('./base');
class ContactController extends BaseController {
    async getBanner() {
        const { ctx } = this;
        let ret = await ctx.model.Contact.findOne({ type_id: '1' });
        this.success(ret);
    }
    async getList() {
        const { ctx } = this;
        let ret = await ctx.model.Contact.find({ type_id: '2' });
        let classifyList = await ctx.model.Classify.find({
            classify_pid: 288,
        }).limit(4);
        this.success({ list: ret, classifyList });
    }
}

module.exports = ContactController;