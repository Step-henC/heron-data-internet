import DataTable from "react-data-table-component";
import React from "react";
export default function GroupTable({ groupData }) {
  const columns = [
    {
      name: "Group ID for Technical Replicate",
      selector: (row) => row?.GroupID + " " + row?.Peptide,
      sortable: true,
    },
    {
      name: "Representative Replicate Name",
      selector: (row) => row?.Replicate,
      wrap: true,
      sortable: true,
    },

    {
      name: "Quantification Average (Y)",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      sortable: true,
    },
    {
      name: "Quantification CV",
      selector: (row) => row?.QuantCove,
      wrap: true,
      sortable: true,
    },
    {
      name: "Ratio Average (X)",
      selector: (row) => row?.RatioAvg,
      sortable: true,
      grow: 2,
    },
    {
      name: "Ratio CV",
      selector: (row) => row?.RatioCove,
      sortable: true,
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
