const express = require('express');
const { body } = require('express-validator');
const { createContact } = require('../controllers/contactController');

const router = express.Router();

router.post(
  '/',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone')
      .optional()
      .matches(/^\+?[0-9]{7,15}$/)
      .withMessage('Valid phone number'),
    body('country').notEmpty().withMessage('Country is required'),
    body('interest').optional().isString(),
    body('message')
      .notEmpty().withMessage('Message is required')
      .isLength({ min: 3 })
  ],
  createContact
);

module.exports = router;
