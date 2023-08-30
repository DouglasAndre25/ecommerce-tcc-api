const userController = require('../app/controllers/user')

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
            query: () => {},
        },
    ],
    privateRoutes: [],
}
