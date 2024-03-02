import Select from "react-select";
import React from "react";
export default function GroupTableSubheader({ selectFunction }) {
  const options = [
    { value: "Replicate Name", label: "Replicate Name" },
    {
      value: "Quantification Average (Y axis)",
      label: "Quantification Average (Y axis)",
    },
    { value: "Quantification STDEV", label: "Quantification STDEV" },
    { value: "Quantification CV", label: "Quantification CV" },
    { value: "Ratio Average (X axis)", label: "Ratio Average (X axis)" },
    { value: "Ratio STDEV", label: "Ratio STDEV" },
    { value: "Ratio CV", label: "Ratio CV" },
  ];

  return (
    <>
      <Select
        placeholder="Filter Columns..."
        isMulti={true}
        onChange={(e) => selectFunction(e)}
        options={options}
      />
    </>
  );
}
