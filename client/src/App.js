import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import PDFDisplay from './components/PdfDisplay';
import PageSelection from './components/PageSelection';
import NewPDFLink from './components/NewPdfLink';

function App() {
  const [pdfData, setPDFData] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileUpload = async (message) => {
    // Handle file upload response, set `pdfData` here
    console.log(message); // You can log or display a message to the user
  };

  const handleTogglePage = (page) => {
    // Toggle the selected pages
    const updatedSelectedPages = [...selectedPages];
    if (updatedSelectedPages.includes(page)) {
      updatedSelectedPages.splice(updatedSelectedPages.indexOf(page), 1);
    } else {
      updatedSelectedPages.push(page);
    }
    setSelectedPages(updatedSelectedPages);
  };

  const handleGeneratePDF = async () => {
    if (selectedPages.length === 0) {
      // You should handle this case with a user-friendly message
      console.error('No pages selected.');
      return;
    }

    try {
      const response = await axios.post('/api/pdf/extract', {
        selectedPages,
        originalPdfPath: 'path_to_original_pdf.pdf',
      });

      setDownloadLink(response.data.downloadLink);
    } catch (error) {
      console.error('Error generating new PDF:', error);
      // You should display an error message to the user here
    }
  };

  // In a real application, you would load the list of available pages from the PDF
  // For simplicity, let's assume there are 3 pages available for selection
  const availablePages = [1, 2, 3];

  return (
    <div>
      <h1>PDF Page Extractor</h1>
      <FileUpload onUpload={handleFileUpload} />
      <PDFDisplay pdfData={pdfData} />
      <PageSelection
        pages={availablePages}
        selectedPages={selectedPages}
        onTogglePage={handleTogglePage}
      />
      <button onClick={handleGeneratePDF}>Generate New PDF</button>
      <NewPDFLink downloadLink={downloadLink} />
    </div>
  );
}

export default App;
