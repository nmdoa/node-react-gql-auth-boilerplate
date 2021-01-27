const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goodsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Goods', goodsSchema)
