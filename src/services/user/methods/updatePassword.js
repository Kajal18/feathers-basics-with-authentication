const moment = require('moment');

const updatePassword = async (req, res, next) => {
    try {
        const { app, body } = req;
        const User = app.service('user');
        const sequelize = app.get('sequelizeClient')
        const { user } = sequelize.models
        const { uid, token, password } = body;
        if (!password) {
            throw new Error('PASSWORD_IS_REQUIRED', 400);
        }
        const userInstance = await user.findByPk(uid);
        if (!userInstance || !token || (userInstance.resetToken != token)) {
            throw new Error('INVALID_LINK', 403);
        }
        if (moment().isAfter(moment(userInstance.resetTokenExpiry))) {
            throw new Error('PASSWORD_RESET_LINK_EXPIRED', 403);
        }

        let patchData = {
            password,
            resetTokenExpiry: null,
            resetToken: null
        };

        await User.patch(uid, patchData);
        res.send({ 'status': 'SUCCESS', message: 'Password updated successfully' });
    } catch (e) {
        return next(e);
    }
};

module.exports = updatePassword