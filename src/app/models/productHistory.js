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
}

module.exports = ProductHistory
