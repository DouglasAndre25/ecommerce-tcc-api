const Sequelize = require('sequelize')
const { Model } = Sequelize
const { genderTypes } = require('../../common/constants')
const bcrypt = require('bcryptjs')

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                cpf: Sequelize.STRING,
                name: Sequelize.STRING,
                lastname: Sequelize.STRING,
                gender: {
                    type: Sequelize.ENUM,
                    values: genderTypes,
                },
                birthday: Sequelize.DATE,
                phone: Sequelize.STRING,
                conditionsTerms: Sequelize.BOOLEAN,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'user',
            }
        )

        this.addHook('beforeSave', async (people) => {
            if (people.password) {
                people.password = await bcrypt.hash(people.password, 8)
            }
        })

        this.addHook('beforeUpdate', async (people) => {
            if (people.password) {
                people.password = await bcrypt.hash(people.password, 8)
            }
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.Address, { foreignKey: 'user_id' })
        this.hasMany(models.ProductHistory, {
            foreignKey: 'user_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hook: true,
        })
        this.hasMany(models.Bag, {
            foreignKey: 'user_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hook: true,
        })
    }
}

module.exports = User
