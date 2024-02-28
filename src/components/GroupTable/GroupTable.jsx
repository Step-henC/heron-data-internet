import DataTable from "react-data-table-component";
import React from "react";
export default function GroupTable({ groupData }) {
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
      sortable: false,
    },

    {
      name: "Quantification Average (Y axis)",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      sortable: false,
    },
    {
      name: "Quantification STDEV",
      selector: (row) => row?.QSTDEV,
      wrap: true,
      sortable: false,
    },
    {
      name: "Quantification CV",
      selector: (row) => row?.QuantCove,
      wrap: true,
      sortable: false,
    },
    {
      name: "Ratio Average (X axis)",
      selector: (row) => row?.RatioAvg,
      sortable: false,
      grow: 2,
    },
    {
      name: "Ratio STDEV",
      selector: (row) => row?.RSTDEV,
      sortable: false,
    },
    {
      name: "Ratio CV",
      selector: (row) => row?.RatioCove,
      sortable: false,
    },
  ];

  return (
    <DataTable
      key={"group-averages"}
      keyField="Replicate"
      pagination
      bordered
      striped
      columns={columns}
      data={groupData}
    />
  );
}
