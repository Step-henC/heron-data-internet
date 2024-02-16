import DataTable from "react-data-table-component";
import ExportButton from "../ExportButton/ExportButton";
import { unparse } from "papaparse";
import React, { useMemo, useState, useEffect } from "react";

export default function GroupTable({groupData}) {
const [csvParseList, setCSVParseList] = useState([])
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
        name: 'Quantification CV',
        selector: row => row?.QuantCove,
        wrap: true,
        sortable: true,
    },
    {
        name: 'Ratio Average (X)',
        selector: row => row?.RatioAvg,
        sortable: true,
        grow: 2,
    },
    {
        name: 'Ratio CV',
        selector: row => row?.RatioCove,
        sortable: true,
    }
]

useEffect(() => {
const newList = [];
groupData.forEach((item) => {

    const obj = 
            {
                Peptide: item?.Peptide,
                Replicate: item?.Replicate,
                Protein: item?.Protein,
                Peptide_Peak_Found_Ratio: item["Peptide Peak Found Ratio"],
                Peptide_Retention_Time: item["Peptide Retention Time"],
                Ratio_To_Standard: item["Ratio To Standard"],
                Ratio_Average: item?.RatioAvg,
                Ratio_Coefficient_of_Variance: item?.RatioCove,
                Quantification: item?.Quantification,
                Quantification_Average: item?.QuantAvg,
                Quantification_Coefficient_of_Variance: item?.QuantCove
            }
           //const save = Object.freeze(obj)
            newList.push(obj)
            
        })
    
setCSVParseList(newList)
}, [])

function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }
const exportCSV = ()  => {
   
    const newList = [];
    groupData.forEach((item) => {
    
        const obj = 
                {
                    Peptide: item?.Peptide,
                    Replicate: item?.Replicate,
                    Protein: item?.Protein,
                    Peptide_Peak_Found_Ratio: item["Peptide Peak Found Ratio"],
                    Peptide_Retention_Time: item["Peptide Retention Time"],
                    Ratio_To_Standard: item["Ratio To Standard"],
                    Ratio_Average: item?.RatioAvg,
                    Ratio_Coefficient_of_Variance: item?.RatioCove,
                    Quantification: item?.Quantification,
                    Quantification_Average: item?.QuantAvg,
                    Quantification_Coefficient_of_Variance: item?.QuantCove
                }
               //const save = Object.freeze(obj)
                newList.push(obj)
                
            })
var csvData = new Blob([newList], {type: 'text/csv;charset=utf-8;'});

var csvURL = window.URL.createObjectURL(csvData);

var testLink = document.createElement('a');
testLink.href = csvURL;
testLink.click();

}




    return(
        <DataTable key={'group-averages'} keyField="Replicate" pagination bordered striped columns={columns} data={groupData} 
         />
    )
}