const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6fedf288a98b7e',
    pass: '0cc3194944097f',
  },
});

const sendEmail = (from, to, subject) => transport.sendMail({
  from,
  to,
  subject,
  text: '<i>Test Email</i>',
}, (err, info) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(info);
  }
});

module.exports = { sendEmail };
