// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const NewsSchema = new Schema({
        __v: { type: Number, select: false },
        type_id: { type: Number, required: true },
        news_title: { type: String, required: true },
        title: { type: String, required: false },
        create_date: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: Number, required: false, default: 1 },
        news_intro: { type: String, required: false },
        news_author: { type: String, required: false },
        news_source: { type: String, required: false },
        news_content: { type: String, required: true },
        news_img: { type: String, required: false },
        is_home: { type: Boolean, required: false, default: false },
    }, {
        collection: 'news', // 指定collection名，不然系统会默认带s
        timestamps: {
            currentTime: () => Math.floor(Date.now() / 1000),
        },
    });

    return mongoose.model('News', NewsSchema);
};