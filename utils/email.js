const nodemailer = require('nodemailer');

const sendEmail = async options => {
    //1) create a transpoter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
        
    });
    // console.log(process.env.SMTP_PORT);
    //2)Define the email options
    const mailOptions = {
        form: 'node devops <hello@tourapp.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    };


    //3) Acutally send the email
    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;