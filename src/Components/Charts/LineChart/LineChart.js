import { Line } from 'react-chartjs-2';
import React from 'react';
import './LineChart.css';

const LineChart = (props) => {

  const place = localStorage.getItem("city") + ", " + localStorage.getItem("country");
  //const day = localStorage.getItem("day")

  const data = {
      labels: props.labels,
      datasets: [{
          label: props.text,
          data: props.data,
          fill: true,
          backgroundColor: props.bgColor,
          borderColor: 'rgba(0, 0, 0, 1)',
        },
      ],
  }

  const options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
  }

  return (
    <div>
      <div className='header'>
        <h4 className='title' style = {{color: "black"}}>{props.title}</h4>
        <h6 className='title' style = {{color: "black"}}>{place}</h6>
      </div> 
        <Line 
          data={data} 
          options={options}/>
    </div>
  );
};

export default LineChart;