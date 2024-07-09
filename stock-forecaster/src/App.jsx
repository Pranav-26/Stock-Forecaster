import { useState } from "react";
import Banner from "./Components.jsx/Banner";
import ChartOne from "./Components.jsx/Charts/ChartOne";
import ChartTwo from "./Components.jsx/Charts/ChartTwo";
import Description from "./Components.jsx/Description";
import SearchBox from "./Components.jsx/SearchBox";
import Table from "./Components.jsx/Table";
import AssetProfile from "./Components.jsx/AssetProfile";
import StockForecaster from "./Components.jsx/StockForecaster";
import "./App.css";

const App = () => {
  const [globalTicker, setGlobalTicker] = useState(null);
  
  return (
    <>
      <Banner />
      <SearchBox ticker={globalTicker} setTicker={setGlobalTicker} />
      {globalTicker && <AssetProfile ticker={globalTicker}/>}

      {/* <Particles id="particles" /> */}

      {globalTicker && <ChartOne ticker={globalTicker} />}
       <StockForecaster ticker={globalTicker}/>
      
      <ChartTwo/>
      <div className="mb-20" ></div>

    </>
  );
};

export default App;
