// src/models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email:    { type: String, required: true, lowercase: true, trim: true },
  phone:    { type: String, trim: true },
  country:  { type: String, required: true },
  interest: { type: String, enum: ['Job','Internship','Partnership','Other'], default: 'Other' },
  message:  { type: String, required: true, trim: true },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);
