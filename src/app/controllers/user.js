const { userValidation } = require('../../common/validations')
const user = require('../models/user')
const jwt = require('jsonwebtoken')

const create = async (req, res, next) => {
    try {
        const { body } = req
        await userValidation.validate(body)

        const userExists = await user.findOne({
            where: { email: body.email },
        })

        if (userExists) {
            return next({
                message: 'user.errors.userAlreadyExists',
                path: 'email',
                status: 400,
            })
        }

        const userResponse = await user.create({
            cpf: body.cpf,
            name: body.name,
            lastname: body.lastname,
            gender: body.gender,
            birthday: body.birthday,
            phone: body.phone,
            conditionsTerms: body.conditionsTerms,
            email: body.email,
            password: body.password,
        })

        const token = jwt.sign(
            { id: userResponse.id },
            process.env.APP_SECRET,
            {
                expiresIn: process.env.APP_SECRET_EXPIRES,
            }
        )

        return res.status(201).send({ data: { user: userResponse, token } })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    create,
}
