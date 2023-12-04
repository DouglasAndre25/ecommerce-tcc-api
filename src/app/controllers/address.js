const address = require('../models/address')

const create = async (req, res, next) => {
    try {
        const addressResponse = await address.create({
            postalCode: req.body.postalCode,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            complement: req.body.complement,
            referencePoint: req.body.referencePoint,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            nickname: req.body.nickname,
            user_id: req.body.user_id,
        })

        return res.send({
            data: addressResponse,
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    create,
}
