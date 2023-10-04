const Sequelize = require('sequelize')
const { Model } = Sequelize

class ProductHistory extends Model {
    static init(sequelize) {
        super.init(
            {
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE,
            },
            {
                sequelize,
                tableName: 'productHistory',
                timestamps: true,
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' })
        this.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
}

module.exports = ProductHistory
