const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);

const sendMail = (data) => {
    try {
        sgMail.send(data, (error, result) => {
            if (error) {
                logger.error('ERROR > MAIL API > ', error);
            } else {
                console.log('STATUS CODE > ', 200);
                console.log('RESP BODY > ', data.to);
            }
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = sendMail


