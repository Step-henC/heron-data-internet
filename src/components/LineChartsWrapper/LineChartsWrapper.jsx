import LineCharts from "../LineCharts/LineCharts";

import React from "react";

export default function LineChartsWrapper({dataForLineChart, listOfPeptidesMap}) {

 


//need a wrapper class to make pdf



    return (
        <div       
        >


        {listOfPeptidesMap.map((peptideName, index) => (
            <LineCharts
            key={peptideName + index}
              peptideName={peptideName}
              dataForLineGraph={dataForLineChart.filter(
                (rep) => rep.RatioAvg !== undefined && rep?.Peptide === peptideName
              )}
            />
          ))}
          </div>
    )
}