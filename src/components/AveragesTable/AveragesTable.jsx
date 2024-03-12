import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import MultiColSelect from "../MultiColSelect/MultiColSelect";
export default function AveragesTable({ tableData }) {
  const [selected, setSelected] = useState([]);
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  }
  const columns = [
    {
      id: "Peptide",
      name: "Peptide Name",
      selector: (row) => row?.Peptide,
      omit: selected.some((item) => item.label === "Peptide Name"),
    },
    {
      id: "Replicate",
      name: "Replicate",
      selector: (row) => row?.Replicate,
      wrap: true,
      omit: selected.some((item) => item.label === "Replicate"),
    },
    {
      id: "Peptide Peak Found Ratio",
      name: "Peptide Peak Ratio",
      selector: (row) => row["Peptide Peak Found Ratio"],
      omit: selected.some((item) => item.label === "Peptide Peak Ratio"),
    },
    {
      id: "Peptide Retention Time",
      name: "Peptide Retention Time",
      selector: (row) => row["Peptide Retention Time"],
      omit: selected.some((item) => item.label === "Peptide Retention Time"),
    },
    {
      id: "Protein",
      name: "Protein",
      selector: (row) => row?.Protein,
      omit: selected.some((item) => item.label === "Protein"),
    },
    {
      id: "Quantification",
      name: "Quantification",
      selector: (row) => row?.Quantification,
      omit: selected.some((item) => item.label === "Quantification"),
    },
    {
      id: "QuantAvg",
      name: "Quantification Replicate Avg",
      selector: (row) => row?.QuantAvg,
      wrap: true,
      grow: 2,
      omit: selected.some((item) => item.label === "Quant Group Avg"),
      style: {
        backgroundColor: "rgba(181, 192, 216, 1)",
      },
    },
    {
      id: "Ratio To Standard",
      name: "Ratio To Standard",
      selector: (row) => row["Ratio To Standard"],
      omit: selected.some((item) => item.label === "Ratio To Standard"),
    },
    {
      id: "RatioAvg",
      name: "Ratio Replicate Avg",
      selector: (row) => row?.RatioAvg,
      omit: selected.some((item) => item.label === "Ratio Group Avg"),
      grow: 2,
      style: {
        backgroundColor: "rgba(181, 192, 216, 1)",
      },
    },
  ];

  const subHeaderMemo = useMemo(
    () => <MultiColSelect selectFunction={(e) => setSelected(e)} />,
    []
  );

  return (
    <DataTable
      subHeader
      subHeaderComponent={subHeaderMemo}
      key={"first-table-key-here"}
      pagination
      columns={columns}
      paginationComponentOptions={paginationComponentOptions}
      data={tableData
        .map((item) => {
        return { ...item, id: item?.Replicate };
      })
    }
    />
  );
}
