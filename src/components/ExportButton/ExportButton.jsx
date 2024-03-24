import React from 'react'
export default function ExportButton({ buttonText, onExport }) {
  //need this class to style table export button

  return (
    <>
      <button 
       className="button-button-submit" onClick={() => onExport()}>
       {buttonText}
      </button>
    </>
  );
}
