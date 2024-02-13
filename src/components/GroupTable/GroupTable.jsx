import DataTable from "react-data-table-component";

export default function GroupTable({groupData}) {

const columns = [
    {
        name: 'Group ID for Technical Replicate',
        selector: row => row?.GroupID + " " + row?.Peptide,
        sortable: true,
    },
    {
        name: 'Representative Replicate Name',
        selector: row => row?.Replicate,
     wrap: true,
        sortable: true,
    },
    
    {
        name: 'Quantification Average (Y)',
        selector: row => row?.QuantAvg,
        wrap: true,
        grow: 2,
        sortable: true,
    },
    {
        name: 'Ratio Average (X)',
        selector: row => row?.RatioAvg,
        sortable: true,
        grow: 2,
    }
]







    return(
        <DataTable pagination bordered striped columns={columns} data={groupData} />
    )
}