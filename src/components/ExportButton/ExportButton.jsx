export default function ExportButton({ onExport }) {
  //need this class to style table export button

  return (
    <>
      <button className="button-button-submit" onClick={() => onExport()}>
        Export CSV
      </button>
    </>
  );
}
