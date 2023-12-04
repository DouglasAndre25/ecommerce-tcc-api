const { Sequelize } = require('sequelize')
const product = require('../models/product')

const getAll = async (req, res, next) => {
    try {
        const { total = 20 } = req.query
        const products = await product.findAll({
            limit: total,
            order: Sequelize.literal('RANDOM()'),
        })

        return res.send({
            data: products,
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAll,
}
