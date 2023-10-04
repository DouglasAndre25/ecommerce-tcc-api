const Sequelize = require('sequelize')
const { Model } = Sequelize

class Address extends Model {
    static init(sequelize) {
        super.init(
            {
                postalCode: Sequelize.STRING,
                street: Sequelize.STRING,
                houseNumber: Sequelize.STRING,
                complement: Sequelize.STRING,
                referencePoint: Sequelize.STRING,
                country: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                nickname: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'address',
            }
        )

        return this
    }

    static associate(models) {
        this.hasOne(models.User, {
            foreignKey: 'user_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hook: true,
        })
    }
}

module.exports = Address
