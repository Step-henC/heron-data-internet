import DataTable from "react-data-table-component";
import React from "react";
export default function GroupTable({ groupData, selectedCol }) {
  const dataa = groupData;

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  }
  const columns = [
    {
      id: "Replicate",
      name: "Replicate Name",
      selector: (row) => row?.Replicate,
      wrap: true,
      reorder: true,
    },

    {
      id: "QuantAvg",
      name: "Quantification Average (Y axis)",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      reorder: true,
      omit: selectedCol.some(
        (item) => item.label === "Quantification Average (Y axis)"
      ),
    },
    {
      id: "QSTDEV",
      name: "Quantification STDEV",
      selector: (row) => row?.QSTDEV,
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Quantification STDEV"),
    },
    {
      id: "QuantCove",
      name: "Quantification CV",
      selector: (row) => row?.QuantCove,
      wrap: true,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Quantification CV"),
    },
    {
      id: "RatioAvg",
      name: "Ratio Average (X axis)",
      selector: (row) => row?.RatioAvg,
      grow: 2,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Ratio Average (X axis)"),
    },
    {
      id: "RSTDEV",
      name: "Ratio STDEV",
      selector: (row) => row?.RSTDEV,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Ratio STDEV"),
    },
    {
      id: "RatioCove",
      name: "Ratio CV",
      selector: (row) => row?.RatioCove,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Ratio CV"),
    },
  ];

  return (
    <DataTable
      key={"group-averages"}
      pagination
      bordered
      striped
      columns={columns}
      data={dataa}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
}
