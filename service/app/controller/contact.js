"use strict";
const BaseController = require("./base");
class ContactController extends BaseController {
  async index() {
    const { ctx } = this;
    let ret = await ctx.model.Contact.findOne();
    this.success({ contactInfo: ret });
  }
}

module.exports = ContactController;
