import express from 'express';
import { config } from 'dotenv';
import {
  sendEmail as sgMail,
  processWebhook
} from '../utils/providers/sendgrid';
import { sendEmail as mailGun } from '../utils/providers/mailgun';
import { sendSms } from '../utils/providers/twillio';
import { create, find, deleteAll } from '../utils/database/mongodb';

const router = express.Router();
config();

router.post('/email/webhook/:provider', (req, res, next) => {
  switch (req.params.provider) {
    case 'mailgun':
      break;
    default:
      var events = req.body;
      events.forEach(function(event) {
        // Here, you now have each event and can process them how you like
        processWebhook(event);
      });
  }
});

router.post('/email/:provider', async (req, res, next) => {
  const params = {
    receiverEmail: 'rdwn.dev@gmail.com',
    receiverPhoneNumber: '+601121019912', // with country code
    notificationMessage: 'Hello world', //
    notificationSubject: 'test sending',
    notificationStatus: 'SENDING', // Sent, Read, Fail
    notificationError: null, // could be json response maybe need to parse
    notificationProvider: 'sendgrid', // nexmo, mailgun, sendgrid .. etc
    notificationChannel: 'email', // SMS, email, whatsapp , web push notification
    createdBy: 'Disbursement'
  };
  let foo;
  switch (req.params.provider) {
    case 'mailgun':
      foo = await mailGun(
        params.receiverEmail,
        params.notificationSubject,
        params.notificationMessage
      );
      break;
    default:
      foo = await sgMail(
        params.receiverEmail,
        params.notificationSubject,
        params.notificationMessage
      );
  }
  params.notificationSendId = foo.headers['x-message-id'];
  const results = await create(params, 'Notifications');
  return res.json(foo);
});

router.post('/sms', async (req, res, next) => {
  const params = {
    receiverEmail: 'rdwn.dev@gmail.com',
    receiverPhoneNumber: '+601121019912', // with country code
    notificationMessage: 'Hello world', //
    notificationSubject: null,
    notificationStatus: 'SENDING', // Sent, Read, Fail
    notificationError: null, // could be json response maybe need to parse
    notificationProvider: 'sendgrid', // nexmo, mailgun, sendgrid .. etc
    notificationChannel: 'email', // SMS, email, whatsapp , web push notification
    createdBy: 'Disbursement'
  };
  switch (req.params.provider) {
    case 'twillio':
      sendSms('+19174773626', '+601132086314', 'Hello world');
      break;
    default:
      sendSms('+19174773626', '+601132086314', 'Hello world');
  }

  const results = await create(params, 'Notifications');
  return res.json(results);
});

router.get('/all', async (req, res) => {
  const results = await find('Notifications');
  return res.json(results);
});

///debug to clear data only -dev mode
router.get('/delete', async (req, res) => {
  const result = deleteAll('Notifications');
  return res.send(result);
});
module.exports = router;
