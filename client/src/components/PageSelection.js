import React from 'react';

function PageSelection({ pages, selectedPages, onTogglePage }) {
  return (
    <div>
      {pages.map((page) => (
        <label key={page}>
          <input
            type="checkbox"
            value={page}
            checked={selectedPages.includes(page)}
            onChange={() => onTogglePage(page)}
          />
          Page {page}
        </label>
      ))}
    </div>
  );
}

export default PageSelection;
