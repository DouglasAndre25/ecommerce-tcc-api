const Address = require('../models/address')
const {
    getUserState,
    getDaytime,
    getSeason,
    getUserYears,
} = require('./recomendation')
const jwt = require('jsonwebtoken')

module.exports.getUserExtraParams = async (userResponse) => {
    const token = jwt.sign({ id: userResponse.id }, process.env.APP_SECRET, {
        expiresIn: process.env.APP_SECRET_EXPIRES,
    })

    let state
    const address = await Address.findOne({
        where: { user_id: userResponse.id },
    })
    if (address) {
        state = address.state
    } else if (userResponse.ip) {
        state = await getUserState(userResponse.ip)
    }

    const recomendations = [
        userResponse.gender ?? null,
        getDaytime(),
        getSeason(),
        state,
        userResponse.birthday ? getUserYears(userResponse.birthday) : null,
    ]

    return { token, recomendations }
}
