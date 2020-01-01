const moment = require('moment');

const verifyResetToken = async (req, res, next) => {
    try {
        const { query, app } = req;
        const sequelize = app.get('sequelizeClient')
        const { user } = sequelize.models
        const { uid, token } = query;
        if (!token) {
            throw new Error('INVALID_LINK', 403);
        }
        const userInstance = await user.findByPk(uid);
        if (!userInstance || (userInstance.resetToken != token)) {
            throw new Error('INVALID_LINK', 403);
        }
        if (moment().isAfter(moment(userInstance.resetTokenExpiry))) {
            throw new Error('PASSWORD_RESET_LINK_EXPIRED', 403);
        }

        let successObj = {
            status: 'SUCCESS',
            message: 'Link is valid'
        };

        return res.status(200).json(successObj);
    } catch (exec) {
        return next(exec);
    }
};

module.exports = verifyResetToken;
