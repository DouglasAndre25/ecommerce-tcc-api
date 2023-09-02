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
    if (userResponse.ip) {
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
