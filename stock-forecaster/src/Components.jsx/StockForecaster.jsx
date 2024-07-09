import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function StockForecaster({ticker}) {
  const [stock, setStock] = useState('');
  const [futureDays, setFutureDays] = useState(5);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/stock_forecaster?stock=${ticker}&future_days=${futureDays}`);
      console.log('Response:', response.data);
      setPrediction(response.data.predicted_future_prices);
      setError(null); // Clear error state on successful data fetch
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after the response is received
    }
  }

  useEffect(() => {
    if(ticker){
      getData();
    }
  }, [ticker]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before making the API call
    try {
      await getData();
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

  useEffect(() => {
    console.log('Stock:', stock);
    console.log('Future Days:', futureDays);
    console.log('Prediction:', prediction);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [stock, futureDays, prediction, loading, error]);

  // Convert prediction object to arrays for Chart.js
  const labels = prediction ? Object.keys(prediction) : [];
  const prices = prediction ? Object.values(prediction) : [];

  return (
    <div className="m-6 md:w-[70%] lg:w-[60%] bg-[#012E41] md:m-auto mt-16 md:mt-24 p-6 rounded-xl">
      <h1 className="text-white text-2xl font-bold mb-4">Stock Forecaster</h1>
      <form onSubmit={handleSubmit} className="mb-4">          
        <label className="block text-white mb-2">
          Days of Prediction:
          <input
            type="number"
            value={futureDays}
            onChange={(e) => setFutureDays(e.target.value)}
            className="block w-full bg-[#123C52] text-white rounded px-4 py-2 mt-1"
          />
        </label>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white rounded px-4 py-2 mt-2" style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>Predict</button>
      </form>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-white">Error: {error}</p>}
      {prediction && (
        <div>
          <h2 className="text-white text-lg font-bold mb-2">Predicted Future Prices</h2>
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Price',
                  data: prices,
                  fill: false,
                  borderColor: 'rgba(75,192,192,1)',
                  tension: 0.1
                }
              ]
            }}
          />
        </div>
      )}
    </div>
  );
}

export default StockForecaster;
