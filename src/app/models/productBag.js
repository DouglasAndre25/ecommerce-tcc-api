const Sequelize = require('sequelize')
const { Model } = Sequelize

class ProductBag extends Model {
    static init(sequelize) {
        super.init(
            {
                quantity: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: 'productBag',
            }
        )

        return this
    }
}

module.exports = ProductBag
