/* eslint-disable no-console */
import mailgun from 'mailgun-js';
const DOMAIN = 'sandboxc0cca107a76d49c7838f371df8a2102d.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

export async function sendEmail(email, subject, content) {
  const msg = {
    to: `${email}`,
    from: 'me@samples.mailgun.org',
    subject: `${subject}`,
    html: `${content}`
  };
  try {
    await mg.messages().send(msg, function(error, body) {
      if (error) {
        throw new Error(error);
      }
      console.info(body);
    });
  } catch (err) {
    throw new Error(err);
  }
}
