// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const MarketsTypeSchema = new Schema({
        __v: { type: Number, select: false },
        title: { type: String, required: false },
        type_id: { type: Number, required: false },
        description: { type: String, required: false },
        keywords: { type: String, required: false },
        version_id: { type: Number, required: false },
        title: { type: String, required: true },
        intro: { type: String, required: true },
        page_img: { type: String, required: true },
        img: { type: String, required: false },
        author: { type: String, required: false },
        source: { type: String, required: false },
        content: { type: String, required: false },
    }, {
        collection: 'markets_type', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('MarketsType', MarketsTypeSchema);
};