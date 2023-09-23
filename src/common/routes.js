const userController = require('../app/controllers/user')
const productController = require('../app/controllers/product')

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
    privateRoutes: [],
}
