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
        subject: 'User not verified',
        text: 'User not verified',
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
               dynamic_template_data: {
                token: req.body.token
               }
            }
            ],
        // to: 'nucliogrupoazul@gmail.com', // Change to your recipient
        template_id: "d-cbcd31c1fec140eb9174fc539a4dfd90"
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

