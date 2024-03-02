import DataTable from "react-data-table-component";
import React, { useState, useMemo } from "react";
import GroupTableSubheader from "./GroupTableSubheader";
export default function GroupTable({ groupData, selectedCol }) {


 
  const columns = [
    {
      name: "Replicate Name",
      selector: (row) => row?.Replicate,
      wrap: true,
      sortable: false,
      reorder: true,
      
    },

    {
      name: "Quantification Average (Y axis)",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      sortable: false,
      reorder: true,
      omit: selectedCol.some(
        (item) => item.label === "Quantification Average (Y axis)"
      ),
    },
    {
      name: "Quantification STDEV",
      selector: (row) => row?.QSTDEV,
      wrap: true,
      sortable: false,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Quantification STDEV"),
    },
    {
      name: "Quantification CV",
      selector: (row) => row?.QuantCove,
      wrap: true,
      sortable: false,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Quantification CV"),
    },
    {
      name: "Ratio Average (X axis)",
      selector: (row) => row?.RatioAvg,
      sortable: false,
      grow: 2,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Ratio Average (X axis)"),
    },
    {
      name: "Ratio STDEV",
      selector: (row) => row?.RSTDEV,
      sortable: false,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Ratio STDEV"),
    },
    {
      name: "Ratio CV",
      selector: (row) => row?.RatioCove,
      sortable: false,
      reorder: true,
      omit: selectedCol.some((item) => item.label === "Ratio CV"),
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
