import Layout from "../Layout/Layout";
import React, { useEffect, useState, useRef } from "react";
import heron from "./heronLogo.jpg";
import "./homepage.css";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";

import {
  ACCEPTABLE_FILE_FORMATS,
  BAD_LIST_PATTERN,
  BAD_RUNS_PLACEHOLDER,
} from "../../utils/acceptablefileformat";

export default function HomePage({ setFile, setBadSamples }) {
  const [showCSVForm, setShowCSVForm] = useState(false);
  const [isAcceptableFormat, setIsAcceptableFormat] = useState(true);
  const [isFileProcessed, setIsFileProcessed] = useState(true);
  const [technicalReplicate, setTechnicalReplicate] = useState(1);
  const [inputKey, setInputKey] = useState(Date.now);
  const [goodRun, setGoodRun] = useState(true);
  const [badSampleList, setBadSampleList] = useState("");
  const [charactersRemaining, setCharactersRemaining] = useState(1000);
  const [switchState, setSwitchSate] = useState(false);
  const [badListFormatAccepted, setBadListFormatAccepted] = useState(true);

  const navigate = useNavigate();

  const showForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCSVForm(!showCSVForm);
  };

  const handleFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedFile = e.target.files[0];

    if (selectedFile && !ACCEPTABLE_FILE_FORMATS.includes(selectedFile.type)) {
      setIsAcceptableFormat(false);
    } else {
      setIsAcceptableFormat(true);
    }

    if (isAcceptableFormat) {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        error: function () {
          setIsFileProcessed(false);
        },
        complete: function (results) {
          setFile(results.data);
        },
      });
    }
    //https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
  };

  const handleGoodRun = (e) => {
    setGoodRun(!goodRun);
    setSwitchSate(!switchState);
  };

  const handleBadSampleList = (e) => {
    setBadSampleList(e.target.value);
  };
  const handleTechnicalReplicate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setTechnicalReplicate(e.target.value);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    e.stopPropagation();

    //if first two fields are good, check if the all samples have same replicate num
    if (isAcceptableFormat && isFileProcessed) {
      //if all samples have replicate num, process data
      if (goodRun) {
        setInputKey(Date.now);
        // all same url param is zero for true
        navigate(`/${technicalReplicate}/${0}/charts`);
      }

      //if all samples have diff replicate num...
      if (!goodRun) {
        //test if the list of samples matches the accepted format

        //if format is acceptable
        if (BAD_LIST_PATTERN.test(badSampleList)) {
          //process data

          setInputKey(Date.now);
          setBadSamples(badSampleList)
          //all same is 1 for false
          navigate(`/${technicalReplicate}/${1}/charts`);
        } else {
          setBadListFormatAccepted(
            BAD_LIST_PATTERN.test(badSampleList)
          );
        }
      }

      //refreshes component to nil
    }
  };



  const handleCancel = (e) => {
    e.preventDefault();
    setShowCSVForm(false);
  };

  useEffect(() => {
    setCharactersRemaining(1000 - badSampleList.split("").length);
  }, [badSampleList]);
  useEffect(() => {
    if (showCSVForm) {
      document.getElementById("csv-elem").scrollIntoView();
    }
  }, [showCSVForm]);
  return (
    <Layout>
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          flexDirection: 'column',
          alignItems: "center",
          justifyItems: "center",
          
        }}
      >
        <img
          id={"heron-main-logo"}
          aria-label="heron logo"
          alt="logo"
          src={heron}
        />

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto 0 auto'}}>
        <button onClick={showForm} className="button-button">
            Get Started
          </button>
          <button className="button-button">Learn More</button>

        </div>
      
      
      </div>
     
      {showCSVForm && (
        <form key='key-for-form' id="csv-elem" aria-label="form to upload and submit csv">
          <ul className="wrapper">
            <li className="form-row-title">
              <h2>Upload Skyline File</h2>
            </li>
            <li className="form-row">
              <label htmlFor="file-input">Upload File</label>
              <input
                type="file"
                accept={ACCEPTABLE_FILE_FORMATS}
                key={inputKey}
                onChange={handleFile}
                id="file-input"
              />
            </li>
            {!isAcceptableFormat && (
              <li className="form-row">
                <p
                  aria-label="File format error. Not a valid CSV or XLSX file"
                  style={{ color: "red" }}
                >
                  Error: The selected file is not an acceptable file format.
                  Please select a CSV or xlsx file.
                </p>
              </li>
            )}
            {!isFileProcessed && (
              <li className="form-row">
                <p
                  aria-label="Error processing selected file"
                  style={{ color: "red" }}
                >
                  Error: Unable to process file. Please make sure file is valid.{" "}
                  <a href="/support">Contact support here</a> if the issue
                  continues.
                </p>
              </li>
            )}

            <li className="form-row">
              <label aria-label="select number of replicates" htmlFor="rep-num">
                Technical Replicates
              </label>
              <select
                id="rep-num"
                defaultValue={1}
                onChange={handleTechnicalReplicate}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </li>
            <li className="form-row">
              <Form.Label
                htmlFor="good-run"
                aria-label={`Does each sample have ${technicalReplicate} replicates`}
              >
                {technicalReplicate > 1 ? "Are" : "Is"} there{" "}
                <strong>{technicalReplicate}</strong> replicate
                {technicalReplicate > 1 ? "s" : ""} for each sample?
              </Form.Label>
              <Form.Check
                id="good-run"
                onChange={handleGoodRun}
                checked={goodRun}
                type="switch"
                label={goodRun ? "Yes" : "No"}
              ></Form.Check>
            </li>
            {!goodRun && (
              <li className="form-col">
                <label
                  aria-describedby="bad-sample-list-requirements"
                  htmlFor="bad-sample-list"
                >
                  Provide List of Samples without the Specified Replicates
                </label>
                <br/>
                <small id="bad-sample-list-requirements">
                  {BAD_RUNS_PLACEHOLDER}
                </small>
                {!badListFormatAccepted && (
                  <small aria-label="double check provided samples">
                    <strong>
                      Names may include letters, numbers, underscores and
                      hyphens. Make sure there is a space after each comma.{" "}
                      <a href="/">For more clarity, clck here</a>
                    </strong>
                  </small>
                )}
                <textarea
                  placeholder="ex: (sample1, sample2) (sample3)"
                  name="bad-sample-list"
                  className={
                    badListFormatAccepted
                      ? "bad-sample-input-class"
                      : "bad-sample-input-class-error"
                  }
                  maxLength={1000}
                  required
                  type="text"
                  value={badSampleList}
                  onChange={(e) => handleBadSampleList(e)}
                  id="bad-sample-list"
                  aria-describedby="bad-sample-list-requirements"
                ></textarea>
                {charactersRemaining > 0 ? (
                  <small>
                    {charactersRemaining} character
                    {charactersRemaining > 1 ? "s" : ""} remaining
                  </small>
                ) : (
                  <small>No characters remaining</small>
                )}
                :"
              </li>
            )}
            <li className="form-row-spacer">
              <button
                className="button-button-cancel"
                aria-label="cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="button-button-submit"
                aria-label="submit"
                onClick={handleAnalyze}
                type="submit"
              >
                Analyze
              </button>
            </li>
          </ul>
        </form>
      )}
    </Layout>
  );
}
