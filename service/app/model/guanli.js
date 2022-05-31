// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const GuanliSchema = new Schema({
        __v: { type: Number, select: false },
        type_id: { type: Number, required: true },
        date: { type: String, required: false },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: Number, required: true, default: 1 },
        name: { type: String, required: false },
        zhiwei: { type: String, required: false },
        intro: { type: String, required: false },
        photo: { type: String, required: false },
    }, {
        collection: 'guanli', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Guanli', GuanliSchema);
};