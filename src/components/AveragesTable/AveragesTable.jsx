import React from 'react';
import DataTable from 'react-data-table-component';

export default function AveragesTable({tableData}) {

    const columns = [
        {
            name: 'Peptide Name',
            selector: row => row?.Peptide,
            sortable: true,
        },
        {
            name: 'Replicate',
            selector: row => row?.Replicate,
         wrap: true,
            sortable: true,
        },
        {
            name: 'Peptide Peak Ratio',
            selector: row => row['Peptide Peak Found Ratio'],

            sortable: true,
        },
        {
            name: 'Peptide Retention Time',
            selector: row => row['Peptide Retention Time'],
        },
        {
            name: 'Protein',
            selector: row => row?.Protein,
        },
        {
            name: 'Quantification',
            selector: row => row?.Quantification,
        }, 
        {
            name: 'Quant Group Avg',
            selector: row => row?.QuantAvg,
            wrap: true,
            grow: 2,
            style: {
                backgroundColor: 'rgba(181, 192, 216, 1)',
            },

        },
        {
            name: 'Ratio To Standard',
            selector: row => row['Ratio To Standard'],
        },
        {
            name: 'Ratio Group Avg',
            selector: row => row?.RatioAvg,
            grow: 2,
          
                style: {
                    backgroundColor: 'rgba(181, 192, 216, 1)',
                },
    
            
    }
    ];





    return (
<DataTable title="" pagination  columns={columns} data={tableData.map((item) => { return {...item, id: item?.Replicate}})}

/>
       

    )
}