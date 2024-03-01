import DataTable from "react-data-table-component";
import React, { useState, useMemo } from "react";
import GroupTableSubheader from "./GroupTableSubheader";
export default function GroupTable({ groupData }) {
  const [selected, setSelected] = useState([]);

  const onSorting = (input) => {
    
    switch(input){
      case input === 'Replicate': 
      return groupData.sort((x,y) => x.Replicate - y.Replicate)
      default:
    }
   
  }
 
  const columns = [
    // {
    //   name: "Group ID for Technical Replicate",
    //   selector: (row) => row?.GroupID + " " + row?.Peptide,
    //   sortable: false,
    // },
    {
      name: "Replicate Name",
      selector: (row) => row?.Replicate,
      wrap: true,
      sortable: true,
      reorder: true,
    },

    {
      name: "Quantification Average (Y axis)",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      sortable: false,
      reorder: true,
      omit: selected.some(
        (item) => item.label === "Quantification Average (Y axis)"
      ),
    },
    {
      name: "Quantification STDEV",
      selector: (row) => row?.QSTDEV,
      wrap: true,
      sortable: false,
      reorder: true,
      omit: selected.some((item) => item.label === "Quantification STDEV"),
    },
    {
      name: "Quantification CV",
      selector: (row) => row?.QuantCove,
      wrap: true,
      sortable: false,
      reorder: true,
      omit: selected.some((item) => item.label === "Quantification CV"),
    },
    {
      name: "Ratio Average (X axis)",
      selector: (row) => row?.RatioAvg,
      sortable: false,
      grow: 2,
      reorder: true,
      omit: selected.some((item) => item.label === "Ratio Average (X axis)"),
    },
    {
      name: "Ratio STDEV",
      selector: (row) => row?.RSTDEV,
      sortable: false,
      reorder: true,
      omit: selected.some((item) => item.label === "Ratio STDEV"),
    },
    {
      name: "Ratio CV",
      selector: (row) => row?.RatioCove,
      sortable: false,
      reorder: true,
      omit: selected.some((item) => item.label === "Ratio CV"),
    },
  ];

  const subHeaderMemo = useMemo(
    () => <GroupTableSubheader  selectFunction={(e) => setSelected(e)} />,
    []
  );

  return (
    <DataTable
      subHeader
      subHeaderComponent={subHeaderMemo}
      key={"group-averages"}
      keyField="Replicate"
      pagination
      sortable
      bordered
      striped
      columns={columns}
      data={groupData}
    />
  );
}
