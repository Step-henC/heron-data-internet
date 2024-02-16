export default function ExportButton({onExport}) {

    const preventDefault = (e) => {
        //e.preventDefault()
        onExport()
    }

//need this class to style table export button

    return <><button className="button-button-submit" onClick={() => onExport()}>Export CSV</button></>
}