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

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' })
        this.hasMany(models.ProductBag, {
            foreignKey: 'bag_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hook: true,
        })
    }
}

module.exports = Bag
