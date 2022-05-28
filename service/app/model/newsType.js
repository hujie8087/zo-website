// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const NewsTypeSchema = new Schema({
        __v: { type: Number, select: false },
        type_id: { type: Number, required: true },
        news_title: { type: String, required: true },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: Number, required: false, default: 1 },
        intro: { type: String, required: false },
        author: { type: String, required: false },
        source: { type: String, required: false },
        content: { type: String, required: true },
        img: { type: String, required: false },
    }, {
        collection: 'news_type', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('NewsType', NewsTypeSchema);
};