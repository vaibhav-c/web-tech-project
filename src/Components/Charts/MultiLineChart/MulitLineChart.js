import React from 'react';
import { Line } from 'react-chartjs-2';

const MultiLineChart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
          {
            label: props.text1,
            data: props.data1,
            fill: false,
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 1)',
            yAxisID: 'y-axis-1',
          },
          {
            label: props.text2,
            data: props.data2,
            fill: false,
            backgroundColor: 'rgb(0, 255, 0)',
            borderColor: 'rgba(0, 0, 255, 1)',
            yAxisID: 'y-axis-2',
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                drawOnArea: false,
              },
            },
          ],
        },
      };
    return (
        <div>
        <div className='header'>
        <h3 className='title' style = {{color: "black"}}>{props.title}</h3>
        </div>
        <Line data={data} options={options}/>
        </div>
    )
};

export default MultiLineChart;