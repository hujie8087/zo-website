'use strict';
const BaseController = require('./base');
class ArticleController extends BaseController {
    async list() {
        const { ctx } = this;
        const { pageSize, pageIndex, type_id, news_title } = ctx.query;
        console.log((pageIndex - 1) * pageSize, +pageSize);
        let param = {};
        if (type_id) {
            param.type_id = type_id;
        }
        if (news_title) {
            param.news_title = news_title;
        }
        let ret = await ctx.model.News.find(param)
            .skip((pageIndex - 1) * pageSize)
            .limit(+pageSize);
        let count = await ctx.model.News.count(param);
        this.success({ list: ret, total: count });
    }
    async detail() {
        const { ctx } = this;
        const { id } = ctx.params;
        let info = await ctx.model.News.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }).populate('author');
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
        let ret = await ctx.model.News.create(obj);
        if (ret._id) {
            this.success({
                id: ret._id,
                title: obj.title,
            });
        } else {
            this.error('创建失败');
        }
    }
}

module.exports = ArticleController;