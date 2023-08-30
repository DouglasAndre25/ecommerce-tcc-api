const Sequelize = require('sequelize')
const { Model } = Sequelize

class Bag extends Model {
    static init(sequelize) {
        super.init(
            {
                totalPrice: Sequelize.STRING,
                completedPurchase: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                tableName: 'bag',
            }
        )

        return this
    }
}

module.exports = Bag
