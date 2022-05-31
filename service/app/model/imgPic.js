// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const imgPicSchema = new Schema({
        __v: { type: Number, select: false },
        img_pic_id: { type: Number, required: true },
        date: { type: Number, required: true },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: Number, required: true, default: 1 },
        name: { type: String, required: false },
        img: { type: String, required: false },
        intro: { type: String, required: false },
        detail: { type: String, required: false },
    }, {
        collection: 'img_pic', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('imgPic', imgPicSchema);
};