const resetToken = require('./resetToken')
const verifyResetToken = require('./verifyResetToken')
const updatePassword = require('./updatePassword')

const Methods = {
    resetToken,
    verifyResetToken,
    updatePassword
}

module.exports = Methods