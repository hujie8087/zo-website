'use strict';
var ObjectId = require('mongodb').ObjectId;
const BaseController = require('./base');
class SustainabilityController extends BaseController {
    async typeList() {
        const { ctx } = this;
        let ret = await ctx.model.Sustainability.find({ is_type: 1 });
        this.success(ret);
    }
    async index() {
        const { ctx } = this;
        const { typeId } = ctx.query;
        let ret = await ctx.model.Sustainability.find({
            is_type: 0,
            type_id: new ObjectId(typeId),
        });
        this.success(ret);
    }
}

module.exports = SustainabilityController;