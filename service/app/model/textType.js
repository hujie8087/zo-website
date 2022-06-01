// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const TextTypeSchema = new Schema({
        __v: { type: Number, select: false },
        text_type_id: { type: String, required: false },
        type_id: { type: String, required: false },
        date: { type: String, required: false },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: String, required: false },
        name: { type: String, required: false },
    }, {
        collection: 'text_type', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('TextType', TextTypeSchema);
};