'use strict';
var ObjectId = require('mongodb').ObjectId;
const BaseController = require('./base');
class ImgPicController extends BaseController {
    async index() {
        const { ctx } = this;
        const { type_id, _id } = ctx.query;
        let imgPicList = await ctx.model.ImgPic.find({
            type_id: new ObjectId(type_id),
        });
        let targets = await ctx.model.ImgPic.find({ type_id: new ObjectId(_id) });
        this.success({ imgList: imgPicList, targets: targets });
    }
}

module.exports = ImgPicController;