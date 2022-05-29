// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const MessageSchema = new Schema({
        __v: { type: Number, select: false },
        message_id: { type: Number, required: false, default: '' },
        type_id: { type: Number, required: false, default: 11 },
        date: { type: Number, required: false, default: '' },
        title: { type: String, required: false, default: '' },
        keywords: { type: String, required: false, default: '' },
        description: { type: String, required: false },
        version_id: { type: Number, required: false, default: 1 },
        tel: { type: String, required: false, default: '' },
        email: { type: String, required: false, default: '' },
        theme: { type: String, required: false, default: '' },
        content: { type: String, required: false, default: '' },
        name: { type: String, required: false, default: '' },
        person: { type: String, required: false, default: '' },
    }, {
        collection: 'message', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Message', MessageSchema);
};