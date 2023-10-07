import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import 'chartjs-adapter-moment'; 
import 'chart.js/auto'; 
import './GraphComponent.css';

function GraphComponent() {
  const [graphData, setGraphData] = useState({});
  const [loading, setLoading] = useState(true);
  const [desiredStartDate, setDesiredStartDate] = useState('2022-01-01'); 
  const [stock, setStock] = useState('NFLX'); 
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    axios
      .post('http://127.0.0.1:8000/api/predict_stock_api/', {
        stock_symbol: stock,
        start_date: desiredStartDate,
      })
      .then((response) => {
        setGraphData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .post('http://127.0.0.1:8000/api/predict_stock_api/', {
        stock_symbol: stock, // Example stock symbol
        start_date: desiredStartDate, // Example start date
      })
      .then((response) => {
        setGraphData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array means useEffect runs once after the initial render

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  const historicalData = graphData.historical_data.filter((entry) => {
    return new Date(entry.Date).getFullYear() >= 2000;
  });

  const historicalDates = historicalData.map((entry) => entry.Date);
  const historicalPrices = historicalData.map((entry) => entry.Close);
  const predictionDates = historicalDates.slice(1); 
  const predictionPrices = graphData.predictions;
  const historicalFormattedData = historicalData.map((entry) => ({
    x: new Date(entry.Date),
    y: entry.Close,
  }));

  const predictionFormattedData = historicalDates.map((date) => ({
    x: new Date(date),
    y: null, 
  }));

  const startDate = new Date(desiredStartDate); 
  const startIndex = historicalDates.findIndex((date) => new Date(date) >= startDate);

  if (startIndex !== -1) {
    historicalDates.slice(startIndex).forEach((date, index) => {
      predictionFormattedData[startIndex + index].y = predictionPrices[index];
    });
  }

  const chartData = {
    labels: historicalDates, 
    datasets: [
      {
        label: 'Predictions',
        data: predictionFormattedData,
        borderColor: 'rgba(255, 0, 0, 1)', // Color red for predictions
        borderWidth: 1,
        fill: false,
        lineTension: 0.1,
        borderJoinStyle: 'round',
      },
      {
        label: 'Close Price',
        data: historicalFormattedData,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        lineTension: 0.1,
        borderJoinStyle: 'round',
      },
    ],
  };

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: false, 
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
      <div className='title'>Stock Predictor</div>
      <div className='flexItem'>
        <div className='accuracy'>Accuracy: {graphData.accuracy}</div>
        <div className='inputSection'>
          <form onSubmit={handleSubmit}>
          <div className='inputSection'>
            <div className='stockInput'>
              <label className="stock">Stock Symbol:</label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className='startInput'>
              <label className="startDate">Start Date:</label>
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={desiredStartDate}
                onChange={(e) => setDesiredStartDate(e.target.value)}
              />
              <button className="submitButton" type="submit">Update</button>
            </div>
          </div>

          </form>
        </div>
      </div>
      <div className='chartItem'>
        <div style={{ maxWidth: '100%', height: '625px' }}>
          <Line className='chart' data={chartData} options={chartOptions} />
      </div>
      </div>
    </div>
  );
}

export default GraphComponent;
