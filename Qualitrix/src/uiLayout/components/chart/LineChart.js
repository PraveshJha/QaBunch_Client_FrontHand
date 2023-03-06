import React from 'react';
import PropTypes from '../../../utils/propTypes';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import DataGeneratorUtility from '../../../QAautoMATER/funcLib/DataGeneratorUtility'
ChartJS.register(ArcElement, Tooltip, Legend);
const LineChart = ({
  ...restProps
}) => {

  var labelvisible = false;
  var labels = {...restProps}['labels'];
  var incomingdata = {...restProps}['data'];
  var color = {...restProps}['color'];
  var label = {...restProps}['label'];
  var listOfDataSets =[];
  for(let i=0;i<incomingdata.length;i++)
  {
    var onebyOneDataSet={};
    onebyOneDataSet['label'] = '';
    onebyOneDataSet['data'] = incomingdata[i];
    onebyOneDataSet['borderColor']= '#000000';
    onebyOneDataSet['borderWidth']= 3;
    onebyOneDataSet['tension']= 0.1;
    listOfDataSets.push(onebyOneDataSet)
  }
  if(label.length > 0)
  {
    labelvisible=true;
    for (let i = 0; i < listOfDataSets.length; i++) {
      listOfDataSets[i]['label'] = label[i];
    }
  }
  if(color ===undefined || color.length ===0)
  {
    for (let i = 0; i < listOfDataSets.length; i++) {
      const promiseResolver = Promise.resolve(DataGeneratorUtility.gerHexaColorCode());
      promiseResolver.then((value) => {
        listOfDataSets[i]['borderColor'] = value;
      });
    }
  }
  else{
    for (let i = 0; i < listOfDataSets.length; i++) {
      listOfDataSets[i]['borderColor'] = color[i];
    }
  }
  
  var options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display:labelvisible,
      },
    },
  };
  var data = {
    labels: labels,
    datasets: listOfDataSets,
  };
  return <Line data={data} options={options}/>;
};

LineChart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
  color :PropTypes.array,
  label :PropTypes.array,
};

LineChart.defaultProps = {
  labels: [],
  data:[],
  color :[],
  label:[],
};

export default LineChart;
