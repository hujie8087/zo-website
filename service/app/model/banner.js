// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const BannerSchema = new Schema({
        __v: { type: Number, select: false },
        banner_id: { type: Number, required: true },
        type_id: { type: Number, required: false, default: 1 },
        date: { type: String, required: false },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        subtitle: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: Number, required: false, default: 1 },
        banner_title: { type: String, required: false },
        banner_url: { type: String, required: false },
        banner_img: { type: String, required: false },
        content: { type: String, required: false },
    }, {
        collection: 'banner', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Banner', BannerSchema);
};