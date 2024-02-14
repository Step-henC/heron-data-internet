import React, { useState, useEffect } from "react";
import LineCharts from "../LineCharts/LineCharts";
import AveragesTable from "../AveragesTable/AveragesTable";
import GroupTable from "../GroupTable/GroupTable";
import { std, variance,  } from "mathjs";

export default function MainTable({ fileData, repNum, outlierSampleFromFile }) {
 
  
  
    const [outlierArr, setOutlierArr] = useState([])
    const [listOfPeptideMaps, setListOfPeptideMaps] = useState([])
    let groupId = 0;
    
  
  useEffect(() => {
    
    let tempSum = []; //for ratio group average
    let tempQuantSum = []; //for quantification group avg
    const replicateSet = repNum;
    
    for (let index = 0; index < fileData.length; index++) {
      tempSum.push((fileData[index]?.ParsedRatioToStandard));
      tempQuantSum.push(
        fileData[index]?.ParsedQuantification)
      
           
        
        if ((index + 1) % replicateSet === 0) {
        //if the next value is end of batch, lets do what we have so far

        //add replicates in that batch
        const initialVal = 0; //for ratio to standard
        const initialQuantVal = 0; //for quantification

        // sum array values
        const sum = tempSum.reduce(
          (accumulator, currentVal) => accumulator + currentVal,
          initialVal
        );
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

        //coefficient of variation
        fileData[index].QuantCove = std(tempQuantSum)/quantSetAvg
        fileData[index].RatioCove = std(tempQuantSum)/replicateSetAverage


        //for line graph
        fileData[index].x = replicateSetAverage;
        fileData[index].y = quantSetAvg;

        //group id for grouptable
        fileData[index].GroupID = ++groupId;


        //for averagesTable

        //refresh the temporary array that holds values for the sum
        tempSum = [];
        //refresh temporary array holding quantification values
        tempQuantSum = [];
      }


      
    }

    if(outlierSampleFromFile.length !== 0){ //if we have outliers
      //create a temp list
      let tempOutlierList = []
        for (let iterator = 0; iterator < outlierSampleFromFile.length; iterator++) { //iterate thru 2D arr

          if (outlierSampleFromFile[iterator].length < 2) { //if only one obj
            const singletonListObj = outlierSampleFromFile[iterator]; //set a variable for that object for readability
            
           
           
              singletonListObj[0].RatioAvg = singletonListObj[0].ParsedRatioToStandard;
              singletonListObj[0].QuantAvg = singletonListObj[0].ParsedQuantification;


              
              //for line charts
              singletonListObj[0].x =  singletonListObj[0].ParsedRatioToStandard;
              singletonListObj[0].y = singletonListObj[0].ParsedQuantification;
              tempOutlierList.push(singletonListObj)

            
          } else { // if there is more than one item in group
            
            const listOfOutliers = outlierSampleFromFile[iterator] //set an obj
            const ratioSum = listOfOutliers.reduce((acc, curr) => acc?.ParsedRatioToStandard + curr?.ParsedRatioToStandard)
            const quantSum = listOfOutliers.reduce((acc, curr) => acc?.ParsedQuantification + curr?.ParsedQuantification)
            const outlierGrpAvg = ratioSum/listOfOutliers.length //find the avg
            const quantGrpAvg = quantSum/listOfOutliers.length
            listOfOutliers[listOfOutliers.length-1].RatioAvg = outlierGrpAvg; //at the last item in arr, create an outlier prop equal to avg
            listOfOutliers[listOfOutliers.length-1].QuantAvg = quantGrpAvg;
            listOfOutliers[listOfOutliers.length-1].RatioCove = std(ratioSum)/outlierGrpAvg;
            listOfOutliers[listOfOutliers.length-1].QuantCove = std(quantSum)/quantGrpAvg; //at the last item in arr, create an outlier prop equal to avg
            //at the last item in arr, create an outlier prop equal to avg


            //for line charts
            listOfOutliers[listOfOutliers.length-1].x = outlierGrpAvg; //at the last item in arr, create an outlier prop equal to avg
            listOfOutliers[listOfOutliers.length-1].y = quantGrpAvg;
            tempOutlierList.push(listOfOutliers) // add this list to the list
            


          }
        }

        setOutlierArr(tempOutlierList)
    }

  }, [repNum, fileData, outlierSampleFromFile]);

  useEffect(() => {
    const uniqueNames = [];
    for (const file of fileData) {
      if (!uniqueNames.includes(file?.Peptide)) {
        uniqueNames.push(file?.Peptide)
      }
    }
    
setListOfPeptideMaps(uniqueNames)

  }, [fileData])

  return (
    <>
    <AveragesTable tableData={[...fileData].concat(outlierArr.flat())}/>
     

      <div
              id="separate_tables"
              
            ></div>



          <GroupTable groupData={[...fileData].concat(outlierArr.flat())
          .filter((rep) => rep.RatioAvg !== undefined)}   />
      <div
              id="separate_tables"
              
            ></div>

<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>

           {listOfPeptideMaps.map((pepName) => <LineCharts peptideName={pepName} dataForLineGraph={[...fileData].concat(outlierSampleFromFile.flat()).filter((rep) => rep.RatioAvg !== undefined && rep?.Peptide === pepName)}/>)}

           </div>

    </>
  );
}
