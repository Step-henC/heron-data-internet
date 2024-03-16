import React from 'react'
export default function ExportButton({ buttonText, onExport }) {
  //need this class to style table export button

// const [loading, setLoading] = useState(false)
  return (
    <>
      <button className="button-button-submit" onClick={() => onExport()}>
       {buttonText}
      </button>
    </>
  );
}
