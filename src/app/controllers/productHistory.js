const productHistory = require('../models/productHistory')
const product = require('../models/product')

const getAllByUser = async (req, res, next) => {
    try {
        const products = await productHistory.findAll({
            where: {
                user_id: req.user.id,
            },
            limit: 20,
            include: {
                model: product,
            },
            order: [['updatedAt', 'DESC']],
        })

        return res.send({
            data: products,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const productHistoryExists = await productHistory.findOne({
            where: {
                product_id: req.body.productId,
                user_id: req.user.id,
            },
        })

        if (productHistoryExists) {
            await productHistory.update(
                {
                    product_id: req.body.productId,
                    user_id: req.user.id,
                },
                {
                    where: {
                        product_id: req.body.productId,
                        user_id: req.user.id,
                    },
                }
            )
        } else {
            await productHistory.create({
                product_id: req.body.productId,
                user_id: req.user.id,
            })
        }

        return res.status(201).send()
    } catch (error) {
        next(error)
    }
}

const exclude = async (req, res, next) => {
    try {
        await productHistory.destroy({
            where: {
                id: req.params.id,
            },
        })

        return res.send()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllByUser,
    exclude,
    create,
}
