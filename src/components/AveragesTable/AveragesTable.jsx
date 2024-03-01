import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import MultiColSelect from "../MultiColSelect/MultiColSelect";
export default function AveragesTable({ tableData }) {
  const [selected, setSelected] = useState([]);
 
  const columns = [
    {
      name: "Peptide Name",
      selector: (row) => row?.Peptide,
      omit: selected.some((item) => item.label === "Peptide Name"),
    },
    {
      name: "Replicate",
      selector: (row) => row?.Replicate,
      wrap: true,
      omit: selected.some((item) => item.label === "Replicate"),
    },
    {
      name: "Peptide Peak Ratio",
      selector: (row) => row["Peptide Peak Found Ratio"],
      omit: selected.some((item) => item.label === "Peptide Peak Ratio"),
    },
    {
      name: "Peptide Retention Time",
      selector: (row) => row["Peptide Retention Time"],
      omit: selected.some((item) => item.label === "Peptide Retention Time"),
    },
    {
      name: "Protein",
      selector: (row) => row?.Protein,
      omit: selected.some((item) => item.label === "Protein"),
    },
    {
      name: "Quantification",
      selector: (row) => row?.Quantification,
      omit: selected.some((item) => item.label === "Quantification"),
    },
    {
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
      name: "Ratio To Standard",
      selector: (row) => row["Ratio To Standard"],
      omit: selected.some((item) => item.label === "Ratio To Standard"),
    },
    {
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
      keyField="Replicate"
      pagination
      columns={columns}
      data={tableData.map((item) => {
        return { ...item, id: item?.Replicate };
      })}
    />
  );
}
