const Sequelize = require('sequelize')
const { Model } = Sequelize

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                brand: Sequelize.STRING,
                category: Sequelize.STRING,
                price: Sequelize.STRING,
                imgUrl: Sequelize.STRING,
                saleQtd: Sequelize.INTEGER,
                description: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'product',
            }
        )

        return this
    }

    static associate(models) {
        this.hasMany(models.ProductHistory, {
            foreignKey: 'product_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hook: true,
        })
        this.hasMany(models.ProductBag, {
            foreignKey: 'product_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hook: true,
        })
    }
}

module.exports = Product
