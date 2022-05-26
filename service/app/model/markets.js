// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const MarketsSchema = new Schema({
        __v: { type: Number, select: false },
        title: { type: String, required: false },
        type_id: { type: Number, required: false },
        description: { type: String, required: false },
        keywords: { type: String, required: false },
        version_id: { type: Number, required: false },
        name: { type: String, required: true },
        min_img: { type: String, required: false },
        max_img: { type: String, required: false },
        content: { type: String, required: false },
    }, {
        collection: 'markets', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Markets', MarketsSchema);
};