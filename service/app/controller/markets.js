'use strict';
const BaseController = require('./base');
class MarketsController extends BaseController {
    async list() {
        const { ctx } = this;
        const { pageSize, pageIndex, typeId, title } = ctx.query;
        let param = {};
        if (typeId) {
            param.type_id = typeId;
        }
        if (title) {
            param.markets_title = title;
        }
        let ret = await ctx.model.Markets.find(param)
            .sort({ date: -1 })
            .skip((pageIndex - 1) * pageSize)
            .limit(+pageSize);
        let count = await ctx.model.Markets.count(param);
        this.success({ list: ret, total: count });
    }
    async detail() {
        const { ctx } = this;
        const { id } = ctx.params;
        let info = await ctx.model.Markets.findOne({ _id: id });
        this.success(info);
    }
    async create() {
        let { ctx } = this;
        let { userid } = ctx.state;
        const { content } = ctx.request.body;
        // 我们需要对content做一些转义处理
        let title = content.split('\n').find((v) => {
            return v.indexOf('# ') == 0;
        });
        let obj = {
            title: title.replace('# ', ''),
            article: content,
            article_html: content,
            author: userid,
        };
        let ret = await ctx.model.Markets.create(obj);
        if (ret._id) {
            this.success({
                id: ret._id,
                title: obj.title,
            });
        } else {
            this.error('创建失败');
        }
    }
    async getBanner() {
        const { ctx } = this;
        let info = await ctx.model.Banner.findOne({ banner_id: 3 });
        this.success(info);
    }
    async relative() {
        const { ctx } = this;
        const { id } = ctx.params;
        let info = await ctx.model.Markets.find({ _id: { $ne: id } }).limit(4);
        this.success(info);
    }
    async homeList() {
        const { ctx } = this;
        let info = await ctx.model.Markets.find({ is_home: true });
        this.success(info);
    }
    async prevNext() {
        const { ctx } = this;
        const { id } = ctx.params;
        let list = await ctx.model.Markets.find().sort({ date: -1 });
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

module.exports = MarketsController;