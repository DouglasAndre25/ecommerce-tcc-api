const userController = require('../app/controllers/user')
const productController = require('../app/controllers/product')
const productHistoryController = require('../app/controllers/productHistory')
const bagController = require('../app/controllers/bag')
const productBagController = require('../app/controllers/productBag')
const addressController = require('../app/controllers/address')

module.exports = {
    publicRoutes: [
        {
            route: '/user',
            method: 'POST',
            query: userController.create,
        },
        {
            route: '/login',
            method: 'POST',
            query: userController.login,
        },
        {
            route: '/products',
            method: 'GET',
            query: productController.getAll,
        },
    ],
    privateRoutes: [
        {
            route: '/product-history',
            method: 'GET',
            query: productHistoryController.getAllByUser,
        },
        {
            route: '/product-history/:id',
            method: 'DELETE',
            query: productHistoryController.exclude,
        },
        {
            route: '/product-history',
            method: 'POST',
            query: productHistoryController.create,
        },
        {
            route: '/bag',
            method: 'GET',
            query: bagController.getOne,
        },
        {
            route: '/bag/:id',
            method: 'PUT',
            query: bagController.update,
        },
        {
            route: '/product-bag/:id',
            method: 'PUT',
            query: productBagController.update,
        },
        {
            route: '/product-bag/:id',
            method: 'DELETE',
            query: productBagController.exclude,
        },
        {
            route: '/address',
            method: 'POST',
            query: addressController.create,
        },
    ],
}
