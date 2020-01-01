const sendMail = require('../sendMail')
let templates = {
    RESET_PASSWORD: "d-3b966e1eb9fd44309bb812ba681f6c51",
};
const resetPassword = async (data) => {
    const msg = {
        to: data.email,
        from: process.env.FROM_EMAIL,
        templateId: templates.RESET_PASSWORD,
        dynamic_template_data: {
            name: data.name,
            url: `${process.env.APP_URL}/auth/resetPassword?uid=${data.id}&token=${data.resetToken}`
        }
    };
    await sendMail(msg)
}

module.exports = resetPassword