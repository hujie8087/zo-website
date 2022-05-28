'use strict';
const BaseController = require('./base');
class ProductsController extends BaseController {
    async list() {
        const { ctx } = this;
        const { pageSize, pageIndex, name, market, division } = ctx.query;
        var sreacKeyRegExp = new RegExp(name);
        let param = {};
        if (name) {
            param.goods_name = sreacKeyRegExp;
        }
        if (market) {
            param.classify_id = market;
        }
        if (division) {
            param.division_id = division;
        }
        let ret = await ctx.model.Products.find(param)
            .sort({ date: -1 })
            .skip((pageIndex - 1) * pageSize)
            .limit(+pageSize);
        let count = await ctx.model.Products.count(param);
        this.success({ list: ret, total: count });
    }
    async detail() {
        const { ctx } = this;
        const { id } = ctx.params;
        let info = await ctx.model.Products.findOne({ _id: id });
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
        let ret = await ctx.model.Products.create(obj);
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
        let info = await ctx.model.Banner.findOne({ banner_id: 4 });
        this.success(info);
    }
    async relative() {
        const { ctx } = this;
        const { id } = ctx.params;
        let info = await ctx.model.Products.find({ _id: { $ne: id } }).limit(4);
        this.success(info);
    }
    async prevNext() {
        const { ctx } = this;
        const { id } = ctx.params;
        let list = await ctx.model.Products.find().sort({ date: -1 });
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

module.exports = ProductsController;