/* eslint-disable no-console */
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(email, subject, content) {
  const msg = {
    to: `${email}`,
    from: 'test@example.com',
    subject: `${subject}`,
    html: `${content}`
  };
  try {
    return sgMail
      .send(msg)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        //Log friendly error
        console.error(error.toString());

        //Extract error msg
        const { message, code, response } = error;

        //Extract response msg
        const { headers, body } = response;
      });
  } catch (err) {
    throw new Error(err);
  }
}

export async function processWebhook(event) {}
