// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const ClassifySchema = new Schema({
        __v: { type: Number, select: false },
        classify_id: { type: Number, required: true },
        classify_pid: { type: Number, required: true },
        type_id: { type: Number, required: true },
        level_id: { type: Number, required: true },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        note: { type: String, required: false },
        classify_name: { type: String, required: false },
        classify_url: { type: String, required: false },
        classify_note: { type: String, required: false },
        en_name: { type: String, required: false },
        classify_intro: { type: String, required: false },
        classify_img: { type: String, required: false },
        page_img: { type: String, required: false },
        sub_name: { type: String, required: false },
        beizhu: { type: String, required: false },
    }, {
        collection: 'classify', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Classify', ClassifySchema);
};