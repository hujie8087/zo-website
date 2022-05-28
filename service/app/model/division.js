// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const DivisionSchema = new Schema({
        __v: { type: Number, select: false },
        name: { type: String, required: true },
        division_id: { type: Number, select: true },
        type_id: { type: Number, select: true },
        date: { type: String, required: false },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: Number, required: false, default: 1 },
    }, {
        collection: 'division', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Division', DivisionSchema);
};