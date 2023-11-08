import React from 'react';

function PDFDisplay({ pdfData }) {
  return (
    <div>
      {pdfData && (
        <embed
          src={`data:application/pdf;base64,${pdfData}`}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
}

export default PDFDisplay;
