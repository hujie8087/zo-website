// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const SustainabilitySchema = new Schema({
        __v: { type: Number, select: false },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        content: { type: String, required: false },
        version_id: { type: Number, required: false, default: 1 },
        note: { type: String, required: false },
        name: { type: String, required: false },
        url: { type: String, required: false },
        note: { type: String, required: false },
        img: { type: String, required: false },
        sub_name: { type: String, required: false },
        banner: { type: String, required: false },
    }, {
        collection: 'sustainability', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Sustainability', SustainabilitySchema);
};