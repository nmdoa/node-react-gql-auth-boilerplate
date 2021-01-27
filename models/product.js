const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        pictureFront: {
            type: String,
            required: false,
        },
        pictureBack: {
            type: String,
            required: false,
        },
        isActive: Boolean,
        size: {
            S: Number,
            M: Number,
            L: Number,
            XL: Number,
            XX: Number,
        },
        tags: [{ tag: String }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)
