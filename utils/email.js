const nodemailer = require('nodemailer');
const pug =  require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `node devops <${process.env.EMAIL_FROM}>`;
    }


    newTransport(){
        if(process.env.NODE_ENV === 'production'){
            //sendgrid
            return 1;
        }

        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
            
        });
    }

    async send(template, subject){
        //1) render html based a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        })

        //2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html),
            // html:
        };
        // console.log(mailOptions);

        //3) create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome(){
        await this.send('welcome', 'Welcome to the Tour APP !')
    }

    async sendPasswordReset(){
        await this.send('passwordReset', 'Your Password Reset Token (valid for only 10 min)!')
    }
}

// const sendEmail = async options => {
//     //1) create a transpoter
//     // const transporter = nodemailer.createTransport({
//     //     host: process.env.SMTP_HOST,
//     //     port: process.env.SMTP_PORT,
//     //     auth: {
//     //         user: process.env.SMTP_USERNAME,
//     //         pass: process.env.SMTP_PASSWORD
//     //     }
        
//     // });
//     // console.log(process.env.SMTP_PORT);
//     //2)Define the email options
//     // const mailOptions = {
//     //     form: 'node devops <hello@tourapp.io>',
//     //     to: options.email,
//     //     subject: options.subject,
//     //     text: options.message,
//     //     // html:
//     // };


//     //3) Acutally send the email
//     await transporter.sendMail(mailOptions);

// };

// module.exports = sendEmail;