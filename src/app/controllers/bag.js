const bag = require('../models/bag')
const Product = require('../models/product')
const ProductBag = require('../models/productBag')

const getOne = async (req, res, next) => {
    try {
        const userBag = await bag.findOne({
            where: {
                user_id: req.user.id,
                completedPurchase: false,
            },
            include: {
                model: ProductBag,
                include: {
                    model: Product,
                },
            },
        })

        if (userBag) {
            return res.send({
                data: userBag,
            })
        } else {
            const newUserBag = await bag.create({
                user_id: req.user.id,
                completedPurchase: false,
                totalPrice: '0',
            })

            return res.send({
                data: newUserBag,
            })
        }
    } catch (error) {
        return next(error)
    }
}

const update = async (req, res, next) => {
    try {
        await bag.update(
            {
                totalPrice: req.body.totalPrice,
                completedPurchase: req.body.completedPurchase,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )

        return res.send()
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getOne,
    update,
}
