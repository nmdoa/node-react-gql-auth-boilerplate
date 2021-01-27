const authResolver = require('./auth')
const userResolver = require('./user')
const productsResolver = require('./products')

const User = require('../../models/user')
const Goods = require('../../models/goods')

const { user } = require('./binds')

module.exports = {
    ...authResolver,
    ...userResolver,
    ...productsResolver,
    goods: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        try {
            const goods = await Goods.find()
            return goods.map((good) => {
                return {
                    ...good._doc,
                    _id: good.id,
                    user: user.bind(this, good._doc.user),
                }
            })
        } catch (err) {
            throw err
        }
    },
    createGoods: async (args) => {
        const userId = '5f4fa398e7733545c16738ac'
        try {
            const goods = new Goods({
                name: args.name,
                user: userId,
            })
            const result = await goods.save()

            const user = await User.findById(userId)
            if (!user) {
                throw new Error('User not found.')
            }

            user.ownGoods.push(goods)

            await user.save()
            return {
                ...result._doc,
                id: result.id,
            }
        } catch (err) {
            throw err
        }
    },
}
