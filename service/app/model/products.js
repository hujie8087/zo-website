// 用户字段设计
module.exports = (app) => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;

    const ProductsSchema = new Schema({
        __v: { type: Number, select: false },
        goods_id: { type: Number, required: false },
        type_id: { type: Number, required: false },
        date: { type: String, required: false },
        title: { type: String, required: false },
        keywords: { type: String, required: false },
        description: { type: String, required: false },
        version_id: { type: Number, required: false, default: 1 },
        goods_name: { type: String, required: false },
        brand: { type: String, required: false },
        goods_intro: { type: String, required: false },
        goods_type_id: { type: Number, required: false },
        sales: { type: Number, required: false },
        index_img: { type: String, required: false },
        is_index: { type: String, required: false },
        goods_img: { type: String, required: false },
        goods_bigimg: { type: String, required: false },
        goods_content: { type: String, required: false },
        goods_classify_id: { type: Number, required: false },
        color: { type: String, required: false },
        size: { type: String, required: false },
        price: { type: Number, required: false },
        price_array: { type: String, required: false },
        classify_id: { type: Number, required: false },
        division_id: { type: Number, required: false },
    }, {
        collection: 'goods', // 指定collection名，不然系统会默认带s
    });

    return mongoose.model('Products', ProductsSchema);
};