const key = require('../../config/key');
const nodeMailer = require('nodemailer');

 class GmailClient {

     constructor() {
        this.transporter = nodeMailer.createTransport({
            service : 'gmail',
            auth : {
                user : key.gmailClient.mailId,
                pass : key.gmailClient.password,
            }
        });

        this.mailOptions = {
            from : key.gmailClient.mailId,
            to : '',
            subject : '',
            text : '',
        }
    }

    sendMail(mailData) {

        this.mailOptions.to = mailData.toMailIds;
        this.mailOptions.subject = mailData.subject;
        this.mailOptions.text = mailData.mailBody;

        this.transporter.sendMail(this.mailOptions, (err, info) => {

            if(err) {
                console.log('Email send failed to : ' + ' error : ' + err);
            } else {
                console.log('email send successfully ' + info.response);
            }
        });

    }

    sendDefaultWelcomeMail(emails) {
        this.sendMail({
            toMailIds : emails,
            subject : 'Welcome to BookFilm',
            mailBody : 'We happy to welcome to new BookFilm Features',
        });
    }
    
};

module.exports = GmailClient;