// src/middleware/errorHandler.js
function notFound(req, res, next) {
  res.status(404).json({ message: 'Not Found' });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
}

module.exports = { notFound, errorHandler };
