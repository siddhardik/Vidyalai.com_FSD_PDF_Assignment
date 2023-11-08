const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

const loadPdf = async (pdfPath) => {
  const pdfBuffer = fs.readFileSync(pdfPath);
  return PDFDocument.load(pdfBuffer);
};

const extractPages = async (pdfDoc, selectedPageNumbers) => {
  const newPdfDoc = await PDFDocument.create();
  
  for (const pageNumber of selectedPageNumbers) {
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
    newPdfDoc.addPage(copiedPage);
  }

  return newPdfDoc;
};

const savePdf = async (pdfDoc, outputPath) => {
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
};

module.exports = {
  loadPdf,
  extractPages,
  savePdf,
};
