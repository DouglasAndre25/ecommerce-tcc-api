const userController = require('../app/controllers/user')
const productController = require('../app/controllers/product')
const productHistoryController = require('../app/controllers/productHistory')

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
    ],
}
