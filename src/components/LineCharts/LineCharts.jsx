import { VictoryLine, VictoryChart, VictoryLegend, VictoryTheme, VictoryAxis, VictoryScatter, VictoryCursorContainer, VictoryLabel } from "victory";
export default function LineCharts({peptideName, dataForLineGraph}) {

  
    
    console.log(dataForLineGraph)
  


return (



    <VictoryChart width={700} height={400} animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}  theme={VictoryTheme.material} 
   containerComponent={<VictoryCursorContainer responsive={false} cursorLabel={({ datum }) => `${datum.x}, ${datum.y}`} />}
    >
<VictoryLegend x={50} y={20}
  	title={peptideName}
    centerTitle
    orientation="horizontal"
    gutter={20}
    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
    data={[
      { name: "STD", symbol: { fill: "tomato" } },
      { name: "Unknown", symbol: { fill: "blue" } },
    ]}
  />
<VictoryScatter
  labels={({datum}) => [`y: ${Math.round((datum.y + Number.EPSILON) * 100) / 100}`,  `x: ${Math.round((datum.x + Number.EPSILON) * 100) / 100}`]}
  
 data={dataForLineGraph} name={peptideName} size={5} style={{data: {fill: ({datum}) => datum?.Replicate.match(/(std)/gi) ? 'tomato' : 'blue'}}}/>
<VictoryLine  size={5} style={{data: {fill: 'tomato'}}} data={dataForLineGraph} x='RatioAvg' y='QuantAvg'/>  
<VictoryAxis dependentAxis label={'Light Heavy Peak Area Ratio'} axisLabelComponent={<VictoryLabel textAnchor="start" dy={-20} />}/> 
<VictoryAxis label="Analyte Concentration (fmol)" axisLabelComponent={<VictoryLabel textAnchor="start" dy={20} />} />
    </VictoryChart>
    

)

}