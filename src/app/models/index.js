const Sequelize = require('sequelize')
const User = require('./user')
const Address = require('./address')
const Product = require('./product')
const Bag = require('./bag')
const ProductBag = require('./productBag')
const ProductHistory = require('./productHistory')

const databaseConfig = require('../../config/database')[
    process.env.NODE_ENV || 'development'
]

const models = [User, Address, Product, Bag, ProductBag, ProductHistory]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)
        models
            .map((model) => model.init(this.connection))
            .map((model) => {
                return (
                    model.associate && model.associate(this.connection.models)
                )
            })
    }
}

module.exports = new Database()
