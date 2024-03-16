import DataTable from "react-data-table-component";
import React from "react";
export default function GroupTable({ groupData, selectedCol }) {

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  }

  const sortQuantAvg = (rowA, rowB) => rowA?.QuantAvg - rowB?.QuantAvg
  const sortQuantStdev = (rowA, rowB) => rowA?.QSTDEV - rowB?.QSTDEV
  const sortQuantCV = (rowA, rowB) => rowA?.QuantCove - rowB?.QuantCove

  const sortRatioAvg = (rowA, rowB) => rowA?.RatioAvg - rowB?.RatioAvg
  const sortRatioStdev = (rowA, rowB) => rowA?.RSTDEV - rowB?.RSTDEV
  const sortRatioCV = (rowA, rowB) => rowA?.RatioCove - rowB?.RatioCove



  const columns = [
    {
      name: "Replicate Name",
      selector: (row) => row?.Replicate,
      wrap: true,
      reorder: true,
    },

    {
      name: "Quantification Average (X axis)",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      sortable: true,
      sortFunction: sortQuantAvg,
      reorder: true,
      omit: selectedCol.some(
        (item) => item.label === "Quantification Average (X axis)"
      ),
    },
    {
      name: "Quantification STDEV",
      selector: (row) => row?.QSTDEV,
      wrap: true,
      reorder: true,
      sortable: true,
      sortFunction: sortQuantStdev,
      omit: selectedCol.some((item) => item.label === "Quantification STDEV"),
    },
    {
      name: "Quantification CV",
      selector: (row) => row?.QuantCove,
      wrap: true,
      reorder: true,
      sortable: true,
      sortFunction: sortQuantCV,
      omit: selectedCol.some((item) => item.label === "Quantification CV"),
    },
    {
      name: "Ratio Average (X axis)",
      selector: (row) => row?.RatioAvg,
      grow: 2,
      reorder: true,
      sortable: true,
      sortFunction: sortRatioAvg,
      omit: selectedCol.some((item) => item.label === "Ratio Average (X axis)"),
    },
    {
      name: "Ratio STDEV",
      selector: (row) => row?.RSTDEV,
      reorder: true,
      sortable: true,
      sortFunction: sortRatioStdev,
      omit: selectedCol.some((item) => item.label === "Ratio STDEV"),
    },
    {
      name: "Ratio CV",
      selector: (row) => row?.RatioCove,
      reorder: true,
      sortable: true,
      sortFunction: sortRatioCV,
      omit: selectedCol.some((item) => item.label === "Ratio CV"),
    },
  ];

  return (
    <DataTable
      key={"group-averages"}
      title="Table 2. Data Statistics"
      pagination
      bordered
      striped
      columns={columns}
      data={groupData}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
}
