const userMethods = require('./methods')
const { authenticate } = require('@feathersjs/express');

module.exports = (app) => {
    app.post('/user/mail', authenticate('jwt'), userMethods.resetToken)
    app.get('/user/verify/resetToken', authenticate('jwt'), userMethods.verifyResetToken)
    app.post('/user/updatePassword', authenticate('jwt'), userMethods.updatePassword)
}