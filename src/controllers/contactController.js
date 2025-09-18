const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendConfirmationEmail } = require('../services/mailService'); // ⬅️ import mail service

exports.createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, country, interest, message } = req.body;

    const contact = new Contact({
      fullName,
      email,
      phone,
      country,
      interest,
      message
    });

    await contact.save();

    // ✅ Send confirmation email
    try {
      await sendConfirmationEmail(email, fullName);
      console.log(`Confirmation email sent to ${email}`);
    } catch (mailErr) {
      console.error("❌ Failed to send confirmation email:", mailErr.message);
    }

    res.status(201).json({ message: 'Saved', id: contact._id });
  } catch (err) {
    next(err);
  }
};
