'use strict';
const BaseController = require('./base');
class TextIController extends BaseController {
    async index() {
        const { ctx } = this;
        const { pageSize, pageIndex, typeId } = ctx.query;
        let param = {};
        if (typeId) {
            param.text_type_id = typeId;
        }
        let ret = await ctx.model.TextI.find(param)
            .sort({ date: -1 })
            .skip((pageIndex - 1) * pageSize)
            .limit(+pageSize);
        let count = await ctx.model.TextI.count(param);
        this.success({ list: ret, total: count });
    }
    async detail() {
        const { ctx } = this;
        const { id } = ctx.params;
        let info = await ctx.model.TextI.findOne({ _id: id });
        this.success(info);
    }
    async relative() {
        const { ctx } = this;
        const { id } = ctx.params;
        let info = await ctx.model.TextI.find({ _id: { $ne: id } }).limit(4);
        this.success(info);
    }
    async prevNext() {
        const { ctx } = this;
        const { id } = ctx.params;
        let list = await ctx.model.TextI.find().sort();
        let activeInfo = {};
        for (let index = 0; index < list.length; index++) {
            if (list[index]._id == id) {
                activeInfo = {
                    prev: index - 1 < 0 ? '' : list[index - 1],
                    next: index + 1 < 0 ? '' : list[index + 1],
                };
            }
        }
        this.success(activeInfo);
    }
}

module.exports = TextIController;