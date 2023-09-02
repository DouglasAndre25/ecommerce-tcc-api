const yup = require('yup')
const messages = require('./messages')
const { genderTypes } = require('./constants')

const userValidation = yup.object({
    cpf: yup
        .string(messages.general.invalidType)
        .required(messages.general.required),
    name: yup
        .string(messages.general.invalidType)
        .required(messages.general.required),
    lastname: yup
        .string(messages.general.invalidType)
        .required(messages.general.required),
    gender: yup.mixed().oneOf(genderTypes),
    birthday: yup.date(messages.general.invalidType),
    phone: yup.string(messages.general.invalidType),
    conditionsTerms: yup
        .boolean(messages.general.invalidType)
        .required(messages.general.required),
    email: yup
        .string(messages.general.invalidType)
        .required(messages.general.required),
    password: yup
        .string(messages.general.invalidType)
        .required(messages.general.required),
})

const loginValidation = yup.object({
    email: yup
        .string(messages.general.invalidType)
        .required(messages.general.required)
        .email(messages.general.emailFormatInvalid),
    password: yup
        .string(messages.general.invalidType)
        .required(messages.general.required),
})

module.exports = {
    userValidation,
    loginValidation,
}
