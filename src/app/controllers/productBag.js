const productBag = require('../models/productBag')

const update = async (req, res, next) => {
    try {
        const productBagExists = await productBag.findOne({
            where: {
                product_id: req.body.productId,
                bag_id: req.params.id,
            },
        })

        if (productBagExists) {
            await productBag.update(
                { quantity: req.body.quantity },
                {
                    where: {
                        product_id: req.body.productId,
                        bag_id: req.params.id,
                    },
                }
            )

            return res.send()
        } else {
            await productBag.create({
                product_id: req.body.productId,
                bag_id: req.params.id,
                quantity: req.body.quantity,
            })

            return res.send()
        }
    } catch (error) {
        return next(error)
    }
}

const exclude = async (req, res, next) => {
    try {
        await productBag.destroy({
            where: {
                id: req.params.id,
            },
        })

        return res.send()
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    update,
    exclude,
}
