const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SendGrid setup
sgMail.setApiKey('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'); // Replace this

// Contact form endpoint
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, phone, userType, subject, message } = req.body;

  if (!firstName || !lastName || !email || !userType || !subject || !message) {
    return res.status(400).json({ status: 'error', error: 'Missing required fields' });
  }

  const mailContent = {
    to: 'harshalpatil0317@gmail.com', // replace with your verified SendGrid recipient
    from: 'tejaswasnik.me@gmail.com', // must be a verified sender
    subject: `Contact Form - ${subject}`,
    html: `
      <h2>New Message from AgroScan</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Role:</strong> ${userType}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  sgMail
    .send(mailContent)
    .then(() => res.status(200).json({ status: 'success' }))
    .catch(error => {
      console.error('SendGrid error:', error);
      res.status(500).json({ status: 'error', error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
