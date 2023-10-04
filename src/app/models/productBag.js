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

    static associate(models) {
        this.belongsTo(models.Bag, { foreignKey: 'bag_id' })
        this.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
}

module.exports = ProductBag
