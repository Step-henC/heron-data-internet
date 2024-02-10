import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MainTable({ fileData, repNum, outlierSampleFromFile }) {
 
  const [replicateBatch, setReplicateBatch] = useState(new Map());
  const [quantificationReplicateBatch, setQuantificationReplicateBatch] =
    useState(new Map());
    const [outlierArr, setOutlierArr] = useState([])
  useEffect(() => {
    // if (!fileData) return;
    const tempReplicate = new Map();
    const tempQuantReplicate = new Map();
    let tempSum = []; //for ratio group average
    let tempQuantSum = []; //for quantification group avg
    const replicateSet = repNum;
    for (let index = 0; index < fileData.length; index++) {
      tempSum.push(parseFloat(fileData[index]["Ratio To Standard"]));
      tempQuantSum.push(
        parseFloat(fileData[index]?.Quantification.split(" ").at(0))
      );

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

        //push average into a map where peptide name is key and average is value
        tempReplicate[fileData[index].Replicate] = replicateSetAverage;
        tempQuantReplicate[fileData[index].Replicate] = quantSetAvg;

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
            const ratioStandard = parseFloat(singletonListObj[0]['Ratio To Standard']);
            console.log('singleton', singletonListObj)
            console.log('ratio stand', ratioStandard) //get the one value since that is the avg
            if (isNaN(ratioStandard)) {// if is not number after parsing
              singletonListObj[0].Outlier = 0;
              tempOutlierList.push(singletonListObj) // make outlier prop with avg = zero

            } else {
              singletonListObj[0].Outlier = ratioStandard
              tempOutlierList.push(singletonListObj)
              console.log('concat', tempOutlierList) //add this obj to the list with a new outlier property

            }
          } else { // if there is more than one item in group
            
            const listOfOutliers = outlierSampleFromFile[iterator] //set an obj
            const outlierGrpAvg = listOfOutliers.reduce((acc, curr) => parseFloat(acc['Ratio To Standard']) + parseFloat(curr['Ratio To Standard']))/listOfOutliers.length //find the avg
            listOfOutliers[listOfOutliers.length-1].Outlier = outlierGrpAvg //at the last item in arr, create an outlier prop equal to avg
            tempOutlierList.push(listOfOutliers) // add this list to the list
            


          }
        }

        setOutlierArr(tempOutlierList)
    }
    //at the end, put all averages in our real map
    setReplicateBatch(tempReplicate);
    setQuantificationReplicateBatch(tempQuantReplicate);
  }, [repNum, fileData, outlierSampleFromFile]);

  

  return (
    <>
      <Table striped bordered hover  size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Peptide Name</th>
            <th>Peptide Peak Ratio</th>
            <th>Peptide Retention Time</th>
            <th>Protein</th>
            <th>Quantification</th>
            <th>Quant Group Avg</th>
            <th>Ratio to Standard</th>
            <th>Ratio Group Average</th>
            <th>Replicate</th>
          </tr>
        </thead>
        <tbody>
          {[...fileData].concat(outlierArr.flat()).map((replicate, index) => {
            return (
              <tr key={replicate.Replicate + index}>
                <td>{index+1}</td>
                <td>{replicate?.Peptide}</td>
                <td>{replicate["Peptide Peak Found Ratio"]}</td>
                <td>{replicate["Peptide Retention Time"]}</td>
                <td>{replicate?.Protein}</td>
                <td>{replicate?.Quantification}</td>
                <td>
                  {(index + 1) % repNum === 0
                    ? quantificationReplicateBatch[replicate.Replicate]
                    : ""}
                </td>
                <td>{replicate["Ratio To Standard"]}</td>
                <td>
                  {(index + 1) % repNum === 0 //if its the nth (repNum) replicate
                    ? (replicate?.Outlier === undefined ? replicateBatch[replicate.Replicate] : replicate?.Outlier) //check if there is an outlier property if not use replicatebath with avg
                    : replicate?.Outlier}         
                </td>
                <td>{replicate?.Replicate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Table striped bordered hover responsive='sm' size="sm">
        <thead>
          <tr key="anykeys">
            <th>Group ID for Technical Replicate</th>
            <th>Replicate Name</th>
            <th>Quantification Average</th>
            <th>Ratio Average</th>
          </tr>
        </thead>
        <tbody key="outtakeys">
          {[...fileData]
            .filter((_, ind) => (ind + 1) % repNum === 0)
            .map((replicate, index) => {
              return (
                <tr key={index}>
                  <td>Group {index + 1}</td>
                  <td>{replicate.Replicate}</td>
                  <td>{replicateBatch[replicate.Replicate]}</td>
                  <td>{quantificationReplicateBatch[replicate.Replicate]}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
