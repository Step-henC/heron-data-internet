import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MainTable from "../MainTable/MainTable";
import Layout from "../Layout/Layout";
import LineCharts from "../LineCharts/LineCharts";
import { FILE_FIELD_NAMES } from "../../utils/acceptablefileformat";
import './chartspage.css'
import { useParams } from "react-router-dom";

export default function ChartsPage() {
  const [pageReloadFile, setPageReloadFile] = useState([]);
  const [isFileErrorMessage, setIsFileErrorMessage] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [isAllSame, setIsAllSame] = useState(true);
  const [allSameUrlGood, setAllSameUrlGood] = useState(true)
  const [replicateNumGood, setReplicateNumGood] = useState(true)
  const [errorWithBadSamples, setErrorWithBadSamples] = useState(false)
  const [outlierSampleFromFile, setOutlierSampleFromFile] = useState([]) 

  let navigate = useNavigate();
  const {allSame} = useParams();
  const {repNum} = useParams();


  
  useEffect(() => {
    let possibleInterval;
    const sessionFile = JSON.parse(sessionStorage.getItem("file"));
    
     

    
    

    if (sessionFile === null || !Array.isArray(sessionFile)) {
      setIsFileErrorMessage(true);

      possibleInterval = setInterval(() => {
        navigate("/");
      }, 10000);
      return () => {
        clearInterval(possibleInterval);
      };
    } else {
      //if it is an array, check that the file is in the expected format
      const fileOK = Object.keys(sessionFile[0]).some(
        (item) => !FILE_FIELD_NAMES.includes(item)
      );
      if (fileOK) {
        setIsFileErrorMessage(true);
        possibleInterval = setInterval(() => {
          navigate("/");
        }, 10000);
        return () => {
          clearInterval(possibleInterval);
        };
      } else {
        if (parseInt(allSame) === 1) { // move logic to after sessionfile === null check
    
          // get bad sample list
            
          const bad = JSON.parse(sessionStorage.getItem('badsamples'))

  
          if (typeof bad !== 'string' || bad === null) {
            setErrorWithBadSamples(true)
          } else {
           
    
            //clean up list so it is only names and no parentesis or anything
            const samplesToFilter = bad.split(')').filter((str) => str !== "").map((str) => {const newstr = str.replace(/[()]/g, "").trim(); return newstr.split(', ')});
    
            //filter provided list of bad samples from session file so we do batch analysis on sample file
            const filtered = [...sessionFile].filter((rep) => !samplesToFilter.some((strArr) => strArr.includes(rep.Replicate)));
            
    
            //retrieve objects of provided names because we need to do math on object properties
            const providedReplicates = [...sessionFile].filter((rep) => samplesToFilter.some((strArr) => strArr.includes(rep.Replicate)))
            console.log('stf', samplesToFilter)
            console.log('filt',filtered)
            console.log('orig', sessionFile)
            console.log('provided reps', providedReplicates)
    
    
            // we now have the list of bad sample names as a 2D array where each group (or single) sample is together
            // and another list containing the bad sample objects that are not grouped together
            // we need te object to be groupd together like the array so we can do analysis
            //so go through the 2D array of names
            const res = samplesToFilter.map((strArr) => {
    
              //for each array in the samples to filter, go through the array to get ALL the objects from the bad list
             let arrOfNameAndObj =  strArr.map((nameReplicate) => {
    
              //return the object that matches the name of the replicate 
                return providedReplicates.find((replicate) => replicate.Replicate === nameReplicate)
              })
              
              // now return the same array, but add the corresponding object
              return arrOfNameAndObj
              })
    
              // error handle
                setErrorWithBadSamples(res.length !== samplesToFilter.length)

                setPageReloadFile(filtered)
                setOutlierSampleFromFile(res)
                clearInterval(possibleInterval)

          }
            
        } else if (parseInt(allSame) === 0) {
           
        clearInterval(possibleInterval);
        setPageReloadFile(sessionFile);
        }
        
        
      }
    }
  
  }, [navigate, allSame]);


  useEffect(() => {
    if (seconds <= 0 || !isFileErrorMessage) return;

    if (isFileErrorMessage) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds, isFileErrorMessage]);

  useEffect(() => {
    //check url params are good
setAllSameUrlGood(parseInt(allSame) === 1 || parseInt(allSame) === 0)
setReplicateNumGood(parseInt(repNum) > 0 && parseInt(repNum) <= 10)
  }, [repNum, allSame])

  return (
    <Layout>
      <div
        style={{ paddingTop: "5em", display: "flex", flexDirection: "column", flexShrink: '0'}}
      >
        {isFileErrorMessage && (
          <div
          className="error-div-charts-page"
            aria-label="no file found"
            
          >
            <p
             className="error-message-paragraph"
             
            >
              Error. The file associated with this session is either formatted
              incorrectly or not present. Please make sure a valid file has been selected. Rerouting you to the home page in {seconds} second
              {seconds > 1 ? "s" : ""}
            </p>
          </div>)}
          {errorWithBadSamples && (
          <div
          className="error-div-charts-page"
            aria-label="no file found"
            
          >
            <p
             className="error-message-paragraph"
             aria-label='error, no additional samples provided'
             
            >
              Error. There are samples without the provided number technical samples, however those outlier samples have either not been provided, or cannot be processed. 
              Please select 'No' on the third question in the homepage form and provide the outlier samples in the acceptable format.
              If the error continues, please close this browser window and restart. 
            </p>
          </div>)}

          { (!allSameUrlGood || !replicateNumGood) && (
          <div
          className="error-div-charts-page"
            aria-label="no file found"
          
          >
            <p
            className="error-message-paragraph"   
            >
              Error. Either the number of replicates cannot be processed or it cannot be determined if all the samples in this run have the same 
              number of technical replicates. Please be sure not to alter the url. Failure to do so will cause the data analysis to behvave
              unpredictably. If you feel this is in error, <a href='/'>please contact us here</a>. To return to the home page, <a href='/'>click here.</a>
            </p>
          </div>)}
         
          { (!isFileErrorMessage && allSameUrlGood && replicateNumGood && !errorWithBadSamples) &&(
          <div  
          id='main-charts-page-div'
          >
          <MainTable fileData={pageReloadFile} repNum={parseInt(repNum)} outlierSampleFromFile={outlierSampleFromFile}/>
            <div
              id="separate_tables"
              
            ></div>
            <LineCharts />
            </div>) }
        
      </div>
    </Layout>
  );
}
