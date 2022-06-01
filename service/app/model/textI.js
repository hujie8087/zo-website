// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const TextISchema = new Schema({
        __v: { type: Number, select: false },
        text_i_id: { type: String, required: false },
        type_id: { type: String, required: false },
        date: { type: String, required: false },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: String, required: false },
        text_type_id: { type: String, required: false },
        t_title: { type: String, required: false },
        t_intro: { type: String, required: false },
        t_detail: { type: String, required: false },
        t_video: { type: String, required: false },
    }, {
        collection: 'text_i', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('TextI', TextISchema);
};