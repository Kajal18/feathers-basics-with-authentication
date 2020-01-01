const resetPasswordEmail = require('../../emails/methods/reset-password')
const moment = require('moment');
const randomstring = require('randomstring');
const RESET_EXPIRY_TTL = 15;

const resetToken = async (req, res, next) => {
    try {
        const { body, app } = req
        const sequelize = app.get('sequelizeClient')
        const { user } = sequelize.models
        const User = app.service('user');
        const { email } = body
        if (!email) {
            throw new Error('EMAIL IS REQUIRED');
        }
        const userInstance = await user.findOne({ where: { email } });
        if (!userInstance) {
            throw new Error('EMAIL NOT REGISTERED');
        }
        let patchData = {}, password = randomstring.generate(8);
        patchData = {
            resetToken: randomstring.generate(64),
            resetTokenExpiry: moment().add(RESET_EXPIRY_TTL, 'minutes').toISOString()
        };
        let _user = await User.patch(userInstance.id, patchData);
        await resetPasswordEmail(_user)
        return res.status(200).json({
            message: "Reset password mail sent successfully"
        })
    } catch (err) {
        return next(err)
    }

}

module.exports = resetToken