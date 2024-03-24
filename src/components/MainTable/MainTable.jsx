import React, { useState, useEffect, useRef } from "react";
import LineCharts from "../LineCharts/LineCharts";
import AveragesTable from "../AveragesTable/AveragesTable";
import GroupTable from "../GroupTable/GroupTable";
import { std } from "mathjs";
import "./maintable.css";
import ExportButton from "../ExportButton/ExportButton";
import { unparse } from "papaparse";
import generatePDF from "react-to-pdf";
import GroupTableSubheader from "../GroupTable/GroupTableSubheader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function MainTable({ fileData, repNum, outlierSampleFromFile }) {
  const [outlierArr, setOutlierArr] = useState([]);
  const [listOfPeptideMaps, setListOfPeptideMaps] = useState([]);
  const [justifyCont, setJustifyCont] = useState("space-between");
  const [showData, setShowData] = useState(false);
  const [selectedCol, setSelectedCol] = useState([])
  const [pdfLoading, setPdfLoading] = useState(false)
  const [showErrorX, setShowErrorX] = useState(true)
  const [showErrorY, setShowErrorY] = useState(true)
  const targetRef = useRef(null);

  const toPDF = () => {
    setPdfLoading(true)
    generatePDF(targetRef, {}).then(() => setPdfLoading(false));
  };


  const exportCSV = () => {
    const wholeData = [...fileData]
      .concat(outlierArr.flat())
      .filter((rep) => rep.RatioAvg !== undefined);

    const newList = [];
    wholeData.forEach((item) => {
      const obj = {
        Peptide: item?.Peptide,
        Replicate: item?.Replicate,
        Protein: item?.Protein,
        "Peptide Peak Found Ratio": item["Peptide Peak Found Ratio"],
        "Peptide Retention Time": item["Peptide Retention Time"],
        "Ratio To Standard": item["Ratio To Standard"],
        "Ratio Average": item?.RatioAvg,
        "Ratio Standard Deviation": item?.RSTDEV,
        "Ratio Coefficient of Variance": item?.RatioCove,
        Quantification: item?.Quantification,
        "Quantification Average": item?.QuantAvg,
        "Quantification Standard Deviation": item?.QSTDEV,
        "Quantification Coefficient of Variance": item?.QuantCove,
      };
      newList.push(obj);
    });

    const resultCSV = unparse(newList);

    var csvData = new Blob([resultCSV], { type: "text/csv;charset=utf-8;" });

    var csvURL = window.URL.createObjectURL(csvData);

    var testLink = document.createElement("a");
    testLink.href = csvURL;
    testLink.click();

  };

  useEffect(() => {
    let tempSum = []; //for ratio group average
    let tempQuantSum = []; //for quantification group avg
    const replicateSet = repNum; //group size

    for (let index = 0; index < fileData.length; index++) {
      fileData[index].id = index; //need this for datatables
      tempSum.push(fileData[index]?.ParsedRatioToStandard);
      tempQuantSum.push(fileData[index]?.ParsedQuantification);

      if ((index + 1) % replicateSet === 0) {
        //if the next value is end of batch, lets do what we have so far

        //add replicates in that batch
        const initialVal = 0; //for ratio to standard
        const initialQuantVal = 0; //for quantification

        // sum array values for Ratio To Standard
        const sum = tempSum.reduce(
          (accumulator, currentVal) => accumulator + currentVal,
          initialVal
        );

        //sum array values for Quantification
        const quantSum = tempQuantSum.reduce(
          (acc, currVal) => acc + currVal,
          initialQuantVal
        );

        //find the average of replicates in the batch
        const replicateSetAverage = sum / replicateSet;
        const quantSetAvg = quantSum / replicateSet;

        // create fields with averages
        fileData[index].RatioAvg = replicateSetAverage;
        fileData[index].QuantAvg = quantSetAvg;

        //standard deviation for Ratio by passing in array of values
        fileData[index].RSTDEV = std(tempSum);

        //stdev for Quantification
        fileData[index].QSTDEV = std(tempQuantSum);

        //coefficient of variation
        fileData[index].QuantCove = std(tempQuantSum) / quantSetAvg;
        fileData[index].RatioCove = std(tempSum) / replicateSetAverage;

        //for line graph
        fileData[index].x = replicateSetAverage;
        fileData[index].y = quantSetAvg;

        

        //for averagesTable

        //refresh the temporary array that holds values for the sum
        tempSum = [];
        //refresh temporary array holding quantification values
        tempQuantSum = [];
      }
    }

    if (outlierSampleFromFile.length !== 0) {
      //if we have outliers
      //create a temp list
      let tempOutlierList = [];
      for (
        let iterator = 0;
        iterator < outlierSampleFromFile.length;
        iterator++
      ) {
        //iterate thru 2D arr

        if (outlierSampleFromFile[iterator].length < 2) {
          //if only one obj
          const singletonListObj = outlierSampleFromFile[iterator]; //set a variable for that object for readability

          singletonListObj[0].RatioAvg =
            singletonListObj[0].ParsedRatioToStandard;
          singletonListObj[0].QuantAvg =
            singletonListObj[0].ParsedQuantification;

          //for line charts
          singletonListObj[0].x = singletonListObj[0].ParsedRatioToStandard;
          singletonListObj[0].y = singletonListObj[0].ParsedQuantification;
          singletonListObj[0].QuantCove = "single sample";
          singletonListObj[0].RatioCove = "single sample";
          singletonListObj[0].RSTDEV = "single sample";
          singletonListObj[0].QSTDEV = "single sample";

          tempOutlierList.push(singletonListObj);
        } else {
          // if there is more than one item in group

          const listOfOutliers = outlierSampleFromFile[iterator]; //set an obj
          const ratioSum = listOfOutliers.reduce(
            (acc, curr) =>
              acc?.ParsedRatioToStandard + curr?.ParsedRatioToStandard
          );
          const quantSum = listOfOutliers.reduce(
            (acc, curr) =>
              acc?.ParsedQuantification + curr?.ParsedQuantification
          );
          const outlierGrpAvg = ratioSum / listOfOutliers.length; //find the avg
          const quantGrpAvg = quantSum / listOfOutliers.length;
          listOfOutliers[listOfOutliers.length - 1].RatioAvg = outlierGrpAvg; //at the last item in arr, create an outlier prop equal to avg
          listOfOutliers[listOfOutliers.length - 1].QuantAvg = quantGrpAvg;
          listOfOutliers[listOfOutliers.length - 1].RSTDEV = std(ratioSum);
          listOfOutliers[listOfOutliers.length - 1].QSTDEV = std(quantSum);

          listOfOutliers[listOfOutliers.length - 1].RatioCove =
            std(ratioSum) / outlierGrpAvg;
          listOfOutliers[listOfOutliers.length - 1].QuantCove =
            std(quantSum) / quantGrpAvg; //at the last item in arr, create an outlier prop equal to avg
          //at the last item in arr, create an outlier prop equal to avg

          //for line charts
          listOfOutliers[listOfOutliers.length - 1].x = outlierGrpAvg; //at the last item in arr, create an outlier prop equal to avg
          listOfOutliers[listOfOutliers.length - 1].y = quantGrpAvg;
          tempOutlierList.push(listOfOutliers); // add this list to the list
        }
      }

      setOutlierArr(tempOutlierList);
    }
  }, [repNum, fileData, outlierSampleFromFile]);

  useEffect(() => {
    const uniqueNames = [];
    for (const file of fileData) {
      if (!uniqueNames.includes(file?.Peptide)) {
        uniqueNames.push(file?.Peptide);
      }
    }

    setListOfPeptideMaps(uniqueNames);
    if (uniqueNames.length === 1) {
      setJustifyCont("flex-start");
    }
  }, [fileData]);

  return (
    <>
      <AveragesTable tableData={[...fileData].concat(outlierArr.flat())} />

      <div id="separate_tables" key={"another-key-for-uniqueness"}></div>
      <div
      className="group-buttons-div"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: "0 0 0 .2em"
        }}
      >
        <GroupTableSubheader selectFunction={(e) => setSelectedCol(e)}/>
        <ExportButton buttonText={"Export CSV"} onExport={exportCSV} />
      </div>

      <GroupTable
      selectedCol={selectedCol}
        groupData={[...fileData]
          .concat(outlierArr.flat())
          .filter((rep) => rep.RatioAvg !== undefined)}
      />
      <div id="separate_tables-again" key="here-is-a-key"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
          <OverlayTrigger 
        placement="top"
        overlay={<Tooltip id="button-tooltip-2">Display error bars for Quantification. Error Bars are calculated by the standard deviation.</Tooltip>}>
        <button
          className="button-button-hide"
          onClick={() => 
            setShowErrorY(!showErrorY)
          
        }
        >
          {showErrorY ? "Hide Quantification Error" : "Show Quantification Error"}
        </button>

        </OverlayTrigger>
        <OverlayTrigger 
        placement="top"
        overlay={<Tooltip id="button-tooltip-2">Display error bars for Ratio To Standard. Error Bars are calculated by the standard deviation.</Tooltip>}>
        <button
          className="button-button-hide"
          onClick={() => 
            setShowErrorX(!showErrorX)
          
        }
        >
          {showErrorX ? "Hide Ratio Error" : "Show Ratio Error"}
        </button>

        </OverlayTrigger>
        <button
          className="button-button-hide"
          onClick={() => 
            setShowData(!showData)
          
        }
        >
          {showData ? "Hide Data" : "Show Data"}
        </button>

        <button className="button-button-submit" onClick={toPDF}>
          {pdfLoading ? "Loading" : "Export PDF"}
        </button>
      </div>
      <div
        className="line-chart-div"
        ref={targetRef}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: `${justifyCont}`,
          flexWrap: "wrap",
        }}
      >
        {listOfPeptideMaps.map((pepName, ind) => (
          <LineCharts
        showData={showData}
            key={pepName + ind}
            peptideName={pepName}
            dataForLineGraph={[...fileData]
              .concat(outlierSampleFromFile.flat())
              .filter(
                (rep) => rep.RatioAvg !== undefined && rep?.Peptide === pepName
              )}
              showErrorX={showErrorX}
              showErrorY={showErrorY}
          />
        ))}
      </div>
    </>
  );
}
