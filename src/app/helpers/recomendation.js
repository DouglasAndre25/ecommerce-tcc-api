module.exports.getDaytime = () => {
    const date = new Date()
    const hour = date.getHours()

    if (hour >= 6 && hour < 18) {
        return 'day'
    }

    return 'night'
}

module.exports.getSeason = () => {
    const date = new Date()
    const month = date.getMonth() + 1

    switch (true) {
        case month >= 12 || (month >= 1 && month <= 2):
            return 'summer'
        case month >= 3 && month <= 5:
            return 'fall'
        case month >= 6 && month <= 8:
            return 'winter'
        default:
            return 'spring'
    }
}

module.exports.getUserState = async (ip) => {
    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
    const data = await response.json()

    if (data && data.geoplugin_regionCode) {
        return data.geoplugin_regionCode.toUpperCase()
    }

    return null
}

module.exports.getUserYears = (birthday) => {
    const birthdayArray = birthday.split('-')
    const year = parseInt(birthdayArray[0])

    return `${year - 3}-${year + 3}`
}
