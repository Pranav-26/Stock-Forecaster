import axios from "axios";
import React, { useEffect, useState } from "react";

const AssetProfile = ({ticker}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules",
        params: {
          ticker: ticker,
          module: "asset-profile",
        },
        headers: {
          "X-RapidAPI-Key":
            "3ec98cd22bmshb24056f19fa907dp1636bfjsnb821459e497a",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      };

      try {
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

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;

  return (
    <div className="m-6 md:w-[70%] lg:w-[60%] bg-[#012E41] md:m-auto mt-16 md:mt-24 p-6 rounded-xl">
      <h1 className="text-white text-lg font-bold mb-4">Asset Profile</h1>
      <ul>
        <li className="text-white mb-2">
          <strong>Address:</strong> {data?.address1}, {data?.city},{" "}
          {data?.state}, {data?.zip}, {data?.country}
        </li>
        <li className="text-white mb-2">
          <strong>Website:</strong> <a href={data?.website} className="text-blue-400">{data?.website}</a>
        </li>
        <li className="text-white mb-2">
          <strong>Industry:</strong> {data?.industry}
        </li>
        <li className="text-white mb-2">
          <strong>Sector:</strong> {data?.sector}
        </li>
        <li className="text-white">
          <strong>Summary:</strong> {data?.longBusinessSummary}
        </li>
      </ul>
    </div>
  );
};

export default AssetProfile;
