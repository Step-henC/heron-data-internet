import Layout from "../../components/Layout/Layout";
import perfectsample from "./perfect-heron-sample.png";
import perfectExampleFile from "./heron_sample_demo.csv";
import React, { useState } from "react";
import "./demo.css";
import perfectdatatable from "./perfectdatatable.png";
import grouptable from "./grouptable.png";
import perfectline from "./perfectline.png";
import imperfectfile from "./heron_imperfect_demo.csv";
import imperfectcsv from "./imperfectcsv.png";
import imperfectinput from "./imperfectinput.png";
import  Card  from "react-bootstrap/Card";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function Example() {
  const [isFileProcessed, setIsFileProcessed] = useState(true);

  const handlePerfectDownload = (e) => {
    e.preventDefault();

    fetch(perfectExampleFile)
      .then((dat) => dat.text())
      .then((res) => {
        var csvData = new Blob([res], { type: "text/csv;charset=utf-8;" });

        var csvURL = window.URL.createObjectURL(csvData);

        var testLink = document.createElement("a");
        testLink.href = csvURL;
        testLink.click();
      });
  };

  const handleImperfectDownload = (e) => {
    e.preventDefault();

    fetch(imperfectfile)
      .then((dat) => dat.text())
      .then((res) => {
        var csvData = new Blob([res], { type: "text/csv;charset=utf-8;" });

        var csvURL = window.URL.createObjectURL(csvData);

        var testLink = document.createElement("a");
        testLink.href = csvURL;
        testLink.click();
      });
  };
  return (
    <Layout>
      <div className="main-example-div">
        <h2>Getting Started with Heron Data</h2>
        <section aria-label="here is how to get started section">
          <p>
            Save time on calculating standard calibration curves from your
            Skyline data. All it takes is uploading a valid csv skyline file to
            this site. There are requirements this service assumes has been met,
            in order to yield predictable and reliable results. These
            assumptions will be discussed later. For now, let us start with a
            sterotypical skyline calibration curve csv. See the image below.
          </p>
          {/* <Card bg="dark" className="text-center" text="white" style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center'}}>
          <Card.Title>Perfect Example</Card.Title>

            <Card.Img variant="top" src={perfectsample} />
            <Card.Body>
              <Card.Text>Please make sure 
                <ListGroup>
                    <ListGroupItem>column names have not been altered</ListGroupItem>
                    <ListGroupItem> standard samples have the letters 'std' in the Replicate Name case insensitive</ListGroupItem>
<ListGroupItem>Technical replicates are grouped together in the file. Download below</ListGroupItem>
                </ListGroup>
                
              </Card.Text>
              <button onClick={handlePerfectDownload} className="button-button">Download</button>
              {!isFileProcessed && <Card.Text>File Download Error</Card.Text>}
            </Card.Body>

            </Card> */}
          <div className="image-download-file">
          
            <img
              id="perfect-sample-image"
              src={perfectsample}
              alt="csv ideal sample"
            ></img>
            <p className="download-p" onClick={handlePerfectDownload}>
              If the image is not showing,{" "}
              <strong>download the csv here</strong>
            </p>
            {!isFileProcessed && <h2>File Process error</h2>}
          </div>
          <h4>Example File Highlights</h4>
          <p>
            The main characteristics to notice about the pictured example file
            are as follows:
          </p>
          <ul>
            <li>
              <strong>Standards have 'std' in the Replicate Name</strong>
            </li>
            <span>
              <p>
                Replicate name is one of the only unique identifiers in the
                sample. The line graph color codes unknown samples from
                standards for each peptide. It is imperative for the standards
                to have the letters 'std' in the Replicate name for the line
                graphs to differentiate standards from unkowns
              </p>
            </span>
            <li>
              <strong>Technical replicates are grouped together</strong>
            </li>
            <span>
              <p>
                The technical replicate groups have different background colors
                for visual purposes. That is not necessary for Heron Data
                analysis. However, this program assumes that technical
                replicates are grouped together one after the other. Evidence of
                this can be seen in the Replicate name ending in 1,2 or 3 to
                signify technical replicate group for a run with 3 technical
                replicates. Ending the Replicate name in a number is also not
                necessary, but illustrated here for visual purposes.
              </p>
            </span>
            <li>
              <strong>The column names have not been altered</strong>
            </li>
            <span>
              <p>
                Heron Data assumes the column names are as pictured above. These
                column names should be default from the Skyline file. Any
                alteration of the columns will reject the csv file and no
                averages will be calculated.
              </p>
            </span>
          </ul>

          <h4>Example File Results</h4>
          <p>The resulting data table is shown below</p>
          <div className="image-download-file">
            <img
              id="perfect-sample-image"
              src={perfectdatatable}
              alt="ideal data table"
            ></img>
            <ul style={{ listStyle: "none" }}>
              <li>
                <p>
                  The data includes the originally submitted data for tracking
                  and two additional columns with calculated averages
                </p>
              </li>

              <li>
                <p>
                  The highlighted columns are the calculated averages of the
                  technical replicate groups. The columns are highlighted in the
                  data table by default.{" "}
                </p>{" "}
              </li>

              <li>
                <p>
                  The data table is complete with pagination in the bottom
                  right, and a column filter in the top right to digest large
                  volumes of data.
                </p>
              </li>
              <li>
                <p>
                  For hands on experience with the databtale, download the
                  example csv and upload the file to heron data.
                </p>
              </li>
            </ul>
          </div>

          <p>Next, a data table with only averages. </p>

          <div className="image-download-file">
            <img
              id="perfect-sample-image"
              src={grouptable}
              alt="ideal data table"
            ></img>
            <ul style={{ listStyle: "none" }}>
              <li>
                <p>
                  The data is the same as above, with the additional replicates
                  removed for clarity.{" "}
                </p>
              </li>
              <li>
                <p>
                  The data includes averages, as well as coefficient of variance
                  (CV) for the technical replicate groups.{" "}
                </p>
              </li>

              <li>
                <p>
                  The Replicate name is that of usually the last technical
                  replicate in the group.{" "}
                </p>{" "}
              </li>
              <li>
                <p>
                  The Export button in the top right will allow you to download
                  the data into a csv
                </p>{" "}
              </li>

              <li>
                <p>
                  Again, for hands on experience with the databtale or if the
                  image is not showing, download the example csv and upload the
                  file to Heron Data.
                </p>
              </li>
            </ul>
          </div>

          <p>
            Finally, Heron Data will create a line chart of the data with the
            ability to export the line chart into a PDF.
          </p>
          <div className="image-download-file">
            <img
              id="perfect-sample-image"
              src={perfectline}
              alt="ideal data table"
            ></img>
            <ul style={{ listStyle: "none" }}>
              <li>
                <p>
                  The line graph includes the R squared value as well as the
                  linear equation{" "}
                </p>
              </li>
              <li>
                <p>
                  The symbol and color for standards and unknowns are shown in
                  the legend{" "}
                </p>
              </li>

              <li>
                <p>
                  The name of the graph is the peptide represented in the data.
                </p>{" "}
              </li>

              <li>
                <p>
                  As always, for hands on experience with the databtale or if
                  the image is not showing, download the example csv and upload
                  the file to Heron Data.
                </p>
              </li>
            </ul>
          </div>
          <h4>Example File with Incomplete Replicates</h4>
          <p>
            Replicates will sometimes have null values. And Heron Data is
            equipped to deal with null values. However, sometimes, a mass
            spectrometry run will have an error in replicate acquisition. In
            other words, suppose a mass spec run was done with three replicates,
            but one sample or a few samples could not be included and thus
            deviates from 3 replicates. The groups with deviating number of
            technical replicates will need to be added with a specific syntax.
            The best way to demonstrate this is with an example.
          </p>
          <div className="image-download-file">
            <img
              id="perfect-sample-image"
              src={imperfectcsv}
              alt="csv ideal sample"
            ></img>
            <p className="download-p" onClick={handleImperfectDownload}>
              If the image is not showing,{" "}
              <strong>download the csv here</strong>
            </p>
            {!isFileProcessed && <h2>File Process error</h2>}
          </div>

          <h4>Atypical Example File Highlights</h4>
          <p>
            This example file data resembles the first example except for the
            following :
          </p>
          <ul>
            <li>
              <strong>Some quantification values have no numbers</strong>
            </li>
            <span>
              <p>
                This is fine. No further action is needed. Heron Data will
                handle these samples
              </p>
            </span>
            <li>
              <strong>
                Not every group has the same number of replicates{" "}
              </strong>
            </li>
            <span>
              <p>
                Each group has three replicates. Except for the first
                highlighted group towards the bottom has two technical
                replicates. The next highlighted group has only one technical
                replicate
              </p>
            </span>
          </ul>
          <p>
            As a result of the variable number of technical replicates, the
            aberrant groups will have to be manually added in the upload form.
          </p>

          <h4>Adding technical replicates manually for Averaging</h4>
          <ol>
            <li>Go to homepage and click 'Get Started' button</li>
            <li>
              Upload form and select number of technical replicates. In this
              case, the number of technical replicates is 3
            </li>
            <li>
              For the question 'Are there 3 replicates for each sample?', click
              the switch to select 'No'. (This is 'Yes' by default)
            </li>
            <li>
              In the free response, add the highlighted samples in parenthesis
              with their respective groups, separated by comma.
              <p>
                For our example, The first group has the Replicate names,
                30240702_MassSpecModel_200ng_STD4_BJCC_spiked_1 And
                30240702_MassSpecModel_200ng_STD4_BJCC_spiked_2. So we would add
                them as
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    alignItems: "center",
                    marginBottom: "3em",
                  }}
                >
                  (30240702_MassSpecModel_200ng_STD4_BJCC_spiked_1,
                  30240702_MassSpecModel_200ng_STD4_BJCC_spiked_2)
                </div>
                The last sample is in a group by itself, so we would add it
                alone as
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  (30240702_MassSpecModel_200ng_STD5_BJCC_spiked_1)
                </div>
                .
              </p>
            </li>
          </ol>
          <div className="image-download-file">
            <img
              id="perfect-sample-image"
              src={imperfectinput}
              alt="csv ideal sample"
            ></img>

            <p>
              If the image is not showing or for more hands on experience,
              download the atypical example file.
            </p>
          </div>
          <h4>That's It!</h4>
          <p>
            For more questions, feel free to <a href="/contact">contact us</a>
          </p>
        </section>
      </div>
    </Layout>
  );
}
