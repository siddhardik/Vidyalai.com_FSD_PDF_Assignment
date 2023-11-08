const fs = require('fs');
const pdfService = require('../services/pdfService');
const { PDFDocument } = require('pdf-lib');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

exports.extractPages = async (req, res) => {
  const { selectedPages, originalPdfPath } = req.body;

  try {
    const originalPdfBuffer = fs.readFileSync(originalPdfPath);
    const pdfDoc = await PDFDocument.load(originalPdfBuffer);
    const newPdfDoc = await PDFDocument.create();

    for (const pageNumber of selectedPages) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
      newPdfDoc.addPage(copiedPage);
    }

    const newPdfBytes = await newPdfDoc.save();

    // Define a unique filename for the new PDF
    const newPdfFilename = `new-pdf-${Date.now()}.pdf`;
    const newPdfPath = `./uploads/${newPdfFilename}`;

    await writeFile(newPdfPath, newPdfBytes);

    // Respond with the path to the new PDF for download
    res.json({ downloadLink: newPdfPath });
  } catch (error) {
    console.error('Error extracting pages and creating new PDF:', error);
    res.status(500).json({ error: 'Failed to extract pages and create a new PDF' });
  }
};
