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
        to: 'nucliogrupoazul@gmail.com', // Change to your recipient
        subject: 'req.body.subject',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail
        .send(msg)
        .then(() => {
          res.send('Email sent')
        })
        .catch((error) => {
          console.error('Error sending email', error)
        });
}
sendEmailTemplate(req, res) {
    const msg = {
        ...this.msg,
        personalizations:[
            {
               "to":[
                  {
                     email: req.body.to
                  }
               ],
            }
            ],
        // to: 'nucliogrupoazul@gmail.com', // Change to your recipient
        template_id: "d-6258e564bb234cb7bb469dc63b18b221"
      };
      sgMail
        .send(msg)
        .then(() => {
          res.send('Email sent')
        })
        .catch((error) => {
          console.error('Error sending email', error)
        });
}

}

module.exports = MailController;

