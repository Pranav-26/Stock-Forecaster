import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ChartOne = ({ ticker }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history",
        params: {
          symbol: ticker,
          interval: "1wk",
          diffandsplits: "false",
        },
        headers: {
          "X-RapidAPI-Key":
            "3ec98cd22bmshb24056f19fa907dp1636bfjsnb821459e497a",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      };

      try {
        setLoading(true)
        const response = await axios.request(options);
        console.log("Response data:", response.data);
        setData(response.data?.body);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);



  if (loading) return <p className="text-center" >Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Extract timestamps and close values
  const timestamps = Object.keys(data)
    ?.map((timestamp) => data[timestamp].date);
  const closeValues = Object.keys(data)
    ?.map((timestamp) => data[timestamp].close);


  return (
    <div className="m-6 md:w-[70%] lg:w-[60%] bg-[#012E41] md:m-auto mt-16 md:mt-24 p-6 rounded-xl">
      <h1 className="text-white text-2xl font-bold mb-4">Stock History</h1>
      <Line
        className="mt-4"
        data={{
          labels: timestamps,
          datasets: [
            {
              label: "Closing Price",
              data: closeValues,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default ChartOne;
