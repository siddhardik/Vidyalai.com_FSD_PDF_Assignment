const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

router.post('/extract', pdfController.extractPages);

module.exports = router;
