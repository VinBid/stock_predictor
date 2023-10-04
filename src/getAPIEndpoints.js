import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import 'chartjs-adapter-moment'; // Import moment adapter for Chart.js
import 'chart.js/auto'; // Import Chart.js

function GraphComponent() {
  const [graphData, setGraphData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a POST request to the Django API endpoint for predictions and graphs using Axios
    axios
      .post('http://127.0.0.1:8000/api/predict_stock_api/', {
        stock_symbol: 'SPOT', // Example stock symbol
        start_date: '2022-01-01', // Example start date
      })
      .then((response) => {
        // Handle the successful response here
        setGraphData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array means useEffect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  const historicalData = graphData.historical_data.filter((entry) => {
    // Filter data to include only entries from the year 2000 and later
    return new Date(entry.Date).getFullYear() >= 2000;
  });

  
  

  // Extract historical dates and prices
  const historicalDates = historicalData.map((entry) => entry.Date);
  const historicalPrices = historicalData.map((entry) => entry.Close);

  // Extract prediction dates and prices (assuming they are available in graphData)
  const predictionDates = historicalDates.slice(1); // Remove the first date since it corresponds to the start date
  const predictionPrices = graphData.predictions;

  // Create formatted data for historical and prediction datasets
  const historicalFormattedData = historicalData.map((entry) => ({
    x: new Date(entry.Date),
    y: entry.Close,
  }));
  const predictionFormattedData = predictionDates.map((date, index) => ({
    x: new Date(date),
    y: predictionPrices[index],
  }));

  const chartData = {
    labels: historicalDates, // Use historical dates for labels
    datasets: [
      {
        label: 'Close Price',
        data: historicalFormattedData,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        lineTension: 0.1,
        borderJoinStyle: 'round',
      },
      {
        label: 'Predictions',
        data: predictionFormattedData,
        borderColor: 'rgba(255, 0, 0, 1)', // Red color for predictions
        borderWidth: 1,
        fill: false,
        lineTension: 0.1,
        borderJoinStyle: 'round',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'YYYY-MM-DD',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Close Price',
        },
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h1>Graph from Django API:</h1>
      <p>Accuracy: {graphData.accuracy}</p>
      <div style={{ maxWidth: '5000px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default GraphComponent;
