// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const LinksSchema = new Schema({
        __v: { type: Number, select: false },
        title: { type: String, required: false },
        subtitle: { type: String, required: false },
        description: { type: String, required: false },
        content: { type: String, required: false },
    }, {
        collection: 'link', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Link', LinksSchema);
};