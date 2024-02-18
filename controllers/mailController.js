const sgMail = require('@sendgrid/mail')

class MailController {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        this.msg = {
            from:'nucliogrupoazul@gmail.com',
        }
    }


sendEmail(req, res) {
    const msg = {
        ...this.msg,
        to: req.body.to, // Change to your recipient
        subject: req.body.subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail
        .send(msg)
        .then(() => {
          res.send('Email sent')
        })
        .catch((error) => {
          res.error('Error sending email', error)
        });
}
}

module.exports = MailController;

