import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";

const ChartTwo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      console.log("object");
      const options = {
        method: "GET",
        url: "https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers",
        params: {
          type: "STOCKS",
          page: "2",
        },
        headers: {
          "X-RapidAPI-Key":
            "3ec98cd22bmshb24056f19fa907dp1636bfjsnb821459e497a",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        // setData(response?)
        setData(response?.data?.body);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);
  return (
    <>
      {/* amin div */}
      <div className="m-6 md:w-[70%] lg:w-[60%] bg-[#012E41] md:m-auto mt-16 md:mt-24 p-6 rounded-xl">
      <h1 className="text-white text-2xl font-bold mb-4">Stock Comparison</h1>
        {/* Company name and logo div */}
        <div className="flex items-center mt-12">
          {/* <img className="h-[1.5rem] ml-2" src={Infosys} alt="Infosys-Logo" /> */}
        </div>

        <Line
          className="mt-4"
          data={{
            labels: data?.map((obj) => obj?.symbol),
            datasets: [
              {
                label: "Current Price",
                data: data?.map((obj) => parseFloat(obj?.netchange)),
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                borderColor:"#fff"
              },
            ],
          }}
        />
      </div>
    </>
  );
};

export default ChartTwo;
