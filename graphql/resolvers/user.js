const bcrypt = require('bcryptjs')

const User = require('../../models/user')

const { goods } = require('./binds')

module.exports = {
    deleteUser: async ({ id }, req) => {
        if (!req.isAuth) {
            throw new Error('Auth required!')
        }
        try {
            const res = await User.deleteOne({ _id: id })
            return res.deletedCount
        } catch (err) {
            throw err
        }
    },
    users: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Auth required!')
        }
        try {
            const users = await User.find(null, null, {
                skip: args.userInput.skip,
                limit: args.userInput.limit,
            })

            return users.map((user) => {
                return {
                    ...user._doc,
                    password: null,
                    _id: user.id,
                    ownGoods: goods.bind(this, user.ownGoods),
                }
            })
        } catch (err) {
            throw err
        }
    },
    _usersMeta: async () => {
        try {
            const count = await User.count()
            return {
                count: count,
            }
        } catch (err) {
            throw err
        }
    },
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({
                email: args.userInput.email,
            })
            if (existingUser) {
                throw new Error('User exists already.')
            }
            const hashedPassword = await bcrypt.hash(
                args.userInput.password,
                12
            )

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            })

            const result = await user.save()

            return {
                ...result._doc,
                password: null,
                _id: result.id,
            }
        } catch (err) {
            throw err
        }
    },
    updateUser: async ({ id, email, password }, req) => {
        if (!req.isAuth) {
            throw new Error('Auth required!')
        }
        try {
            const user = await User.findById(id)
            if (!user) {
                throw new Error('User does not exsist')
            }
            email && (user.email = email)
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 12)
                user.password = hashedPassword
                user.refreshSecret = ''
            }
            const result = await user.save()

            return {
                ...result._doc,
                password: null,
                _id: result.id,
            }
        } catch (err) {
            throw err
        }
    },
}
