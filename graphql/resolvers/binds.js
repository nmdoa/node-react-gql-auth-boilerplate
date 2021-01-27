const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            ownGoods: goods.bind(this, user.ownGoods),
        }
    } catch (err) {
        throw err
    }
}

const goods = async (goodsIds) => {
    try {
        const goods = await Goods.find({
            _id: {
                $in: goodsIds,
            },
        })
        goods.map((good) => {
            return {
                ...good._doc,
                _id: good.id,
                user: user.bind(this, good.user),
            }
        })
        return goods
    } catch (err) {
        throw err
    }
}

module.exports = {
    user,
    goods,
}
