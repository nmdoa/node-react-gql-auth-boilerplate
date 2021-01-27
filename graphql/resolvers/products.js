const Product = require('../../models/product')

module.exports = {
    products: async (args, req) => {
        try {
            let condition
            if (args.userInput) {
                const { skip, limit } = args.userInput
                condition = {
                    skip,
                    limit,
                }
            }

            const products = await Product.find(null, null, condition)

            return products.map((product) => ({
                ...product._doc,
                _id: product.id,
            }))
        } catch (err) {
            throw err
        }
    },
    addProduct: async ({ userInput }, req) => {
        try {
            const product = new Product(userInput)
            product.save()

            return {
                ...product._doc,
                _id: product.id,
            }
        } catch (err) {
            throw err
        }
    },
}
