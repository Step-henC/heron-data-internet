import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MainTable from "../MainTable/MainTable";
import Layout from "../Layout/Layout";
import LineCharts from "../LineCharts/LineCharts";
import { FILE_FIELD_NAMES } from "../../utils/acceptablefileformat";
import { useParams } from "react-router-dom";

export default function ChartsPage() {
  const [pageReloadFile, setPageReloadFile] = useState([]);
  const [isFileErrorMessage, setIsFileErrorMessage] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [isAllSame, setIsAllSame] = useState(true);

  let navigate = useNavigate();
  const {allSame} = useParams();


  
  useEffect(() => {
    let possibleInterval;
    const sessionFile = JSON.parse(sessionStorage.getItem("file"));
    const badList = parseInt(allSame)
    if (parseInt(badList) === 1) {
        const bad = JSON.parse(sessionStorage.getItem('badSamples')).toString()
        
        const samplesToFilter = bad.split(/[)]\s?/g).map((str) => str.replaceAll(/[()]/g, ""));
        const filtered = [...sessionFile].filter((item) => !samplesToFilter.includes(item.Replicate))
        console.log('stf', samplesToFilter)
        console.log('filt',filtered)
        console.log('orig', sessionFile)
        
    }

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
        clearInterval(possibleInterval);
        setPageReloadFile(sessionFile);
      }
    }
  }, [isFileErrorMessage, navigate]);

  useEffect(() => {
    if (seconds <= 0 || !isFileErrorMessage) return;

    if (isFileErrorMessage) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds, isFileErrorMessage]);

  return (
    <Layout>
      <div
        style={{ paddingTop: "5em", display: "flex", flexDirection: "column" }}
      >
        {isFileErrorMessage ? (
          <div
            aria-label="no file found"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                height: "100vh",
                width: "80vw",
                maxWidth: "80vw",
              }}
            >
              Error: The file associated with this session is either formatted
              incorrectly or not present. Please contact us if you believe this
              is in error. Rerouting you to the home page in {seconds} second
              {seconds > 1 ? "s" : ""}
            </h3>
          </div>
        ) : (
          <>
            <MainTable fileData={pageReloadFile} />
            <div
              id="separate_tables"
              style={{
                paddingTop: "5em",
                maxHeight: "5em",
                paddingBottom: "1em",
                minHeight: "1em",
              }}
            ></div>
            <LineCharts />
          </>
        )}
      </div>
    </Layout>
  );
}
