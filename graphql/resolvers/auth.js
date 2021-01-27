const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')

const generateRandomSecret = () => bcrypt.genSaltSync(10)

const generateTokens = async (user, secret1, secret2, refreshSecret) => {
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        secret1,
        {
            expiresIn: '1m',
        }
    )
    const refreshToken = jwt.sign(
        {
            userId: user.id,
        },
        secret2 + refreshSecret,
        {
            expiresIn: '7d',
        }
    )

    return Promise.all([token, refreshToken])
}

module.exports = {
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
    login: async ({ email, password }) => {
        const user = await User.findOne({
            email: email,
        })
        if (!user) {
            throw new Error('User does not exist!')
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            throw new Error('Password is incorrect!')
        }

        const refreshSecret = generateRandomSecret()
        user.refreshSecret = refreshSecret
        user.save()

        const [token, refreshToken] = await generateTokens(
            user,
            process.env.JWT_TOKEN,
            process.env.REFRESH_TOKEN,
            refreshSecret
        )

        return {
            userId: user.id,
            token: token,
            refreshToken: refreshToken,
            email: user.email,
        }
    },
    refreshToken: async ({ token }) => {
        let decodedUserId = -1
        try {
            const { userId } = jwt.decode(token)
            decodedUserId = userId
        } catch (err) {
            throw new Error('Unauthoraithed!')
        }

        const user = await User.findById(decodedUserId)

        if (!user) {
            throw new Error('Unauthoraithed!')
        }

        try {
            decodedToken = jwt.verify(
                token,
                process.env.REFRESH_TOKEN + user.refreshSecret
            )
        } catch (err) {
            throw new Error('Unauthoraithed!')
        }

        const refreshSecret = generateRandomSecret()

        user.refreshSecret = refreshSecret
        user.save()

        const [newToken, refreshToken] = await generateTokens(
            user,
            process.env.JWT_TOKEN,
            process.env.REFRESH_TOKEN,
            refreshSecret
        )

        return {
            userId: user.id,
            token: newToken,
            refreshToken: refreshToken,
        }
    },
}
