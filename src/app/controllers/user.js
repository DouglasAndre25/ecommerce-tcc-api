const { userValidation, loginValidation } = require('../../common/validations')
const { getUserExtraParams } = require('../helpers/user')
const user = require('../models/user')
const address = require('../models/address')
const bcrypt = require('bcryptjs')

const create = async (req, res, next) => {
    try {
        const { body } = req
        await userValidation.validate(body)

        const userExists = await user.findOne({
            where: { email: body.email },
            attributes: [
                'id',
                'cpf',
                'name',
                'lastname',
                'gender',
                'birthday',
                'phone',
                'conditionsTerms',
                'email',
                'password',
            ],
        })

        if (userExists) {
            return next({
                message: 'user.errors.userAlreadyExists',
                path: 'email',
                status: 400,
            })
        }

        const userResponse = await user.create(
            {
                cpf: body.cpf,
                name: body.name,
                lastname: body.lastname,
                gender: body.gender,
                birthday: body.birthday,
                phone: body.phone,
                conditionsTerms: body.conditionsTerms,
                email: body.email,
                password: body.password,
            },
            {
                returning: [
                    'id',
                    'cpf',
                    'name',
                    'lastname',
                    'gender',
                    'birthday',
                    'phone',
                    'conditionsTerms',
                    'email',
                    'password',
                ],
            }
        )
        delete userResponse.dataValues.password

        const { token, recomendations } = await getUserExtraParams({
            ...userResponse.dataValues,
            ip: body.ip,
        })

        return res.send({
            data: {
                user: {
                    id: userResponse.dataValues.id,
                    cpf: userResponse.dataValues.cpf,
                    name: userResponse.dataValues.name,
                    lastname: userResponse.dataValues.lastname,
                    gender: userResponse.dataValues.gender,
                    birthday: userResponse.dataValues.birthday,
                    conditionsTerms: userResponse.dataValues.conditionsTerms,
                    email: userResponse.dataValues.email,
                    recomendations,
                    address: {},
                },
                token,
            },
        })
    } catch (error) {
        return next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { body } = req
        await loginValidation.validate(body)

        const userResponse = await user.findOne({
            where: { email: body.email },
            attributes: [
                'id',
                'cpf',
                'name',
                'lastname',
                'gender',
                'birthday',
                'phone',
                'conditionsTerms',
                'email',
                'password',
            ],
            include: {
                model: address,
                attributes: [
                    'id',
                    'postalCode',
                    'street',
                    'houseNumber',
                    'complement',
                    'referencePoint',
                    'country',
                    'state',
                    'city',
                    'nickname',
                ],
            },
        })

        if (!userResponse)
            return next({
                message: 'login.errors.accountNotFound',
                path: 'email',
                status: 401,
            })

        const passwordVerify = await bcrypt.compare(
            body.password,
            userResponse.password
        )
        if (!passwordVerify)
            return next({
                message: 'login.errors.passwordNotMatch',
                path: 'password',
                status: 401,
            })

        const { token, recomendations } = await getUserExtraParams({
            ...userResponse.dataValues,
            ip: body.ip,
        })

        return res.send({
            data: {
                user: {
                    id: userResponse.id,
                    cpf: userResponse.cpf,
                    name: userResponse.name,
                    lastname: userResponse.lastname,
                    gender: userResponse.gender,
                    birthday: userResponse.birthday,
                    conditionsTerms: userResponse.conditionsTerms,
                    email: userResponse.email,
                    phone: userResponse.phone,
                    recomendations,
                    address: userResponse.Address,
                },
                token,
            },
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    create,
    login,
}
