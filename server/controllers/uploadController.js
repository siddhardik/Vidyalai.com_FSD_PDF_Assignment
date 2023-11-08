const fs = require('fs');
const multer = require('multer');
const path = require('path');
const uploadDir = './uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const uniqueFilename = `${Date.now()}-${originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) === '.pdf') {
      return cb(null, true);
    }
    cb('Only PDF files are allowed');
  },
}).single('pdfFile'); // Assuming your file input field is named 'pdfFile'

exports.uploadPDF = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).json({ error: err });
    }

    // Successfully uploaded
    res.status(200).json({ message: 'File uploaded successfully' });
  });
};
