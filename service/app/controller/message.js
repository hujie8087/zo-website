'use strict';
const BaseController = require('./base');
class MessageController extends BaseController {
    async create() {
        let { ctx } = this;
        const params = ctx.request.body;
        let ret = await ctx.model.Message.create(params);
        if (ret._id) {
            this.message('Message successful!');
        } else {
            this.error('创建失败');
        }
    }
    async list() {
        const { ctx } = this;
        let ret = await ctx.model.Message.find();
        this.success(ret);
    }
}

module.exports = MessageController;