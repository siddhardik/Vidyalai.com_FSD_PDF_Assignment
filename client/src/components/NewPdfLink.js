import React from 'react';

function NewPDFLink({ downloadLink }) {
  return (
    <div>
      {downloadLink && (
        <a href={downloadLink} download>
          Download New PDF
        </a>
      )}
    </div>
  );
}

export default NewPDFLink;
