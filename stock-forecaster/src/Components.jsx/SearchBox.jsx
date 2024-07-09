import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBox = ({ ticker, setTicker }) => {
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  //   const [ticker, setTicker] = useState(null);

  useEffect(() => {
    async function fetchCSV() {
      const response = await fetch("stocktkr.csv");
      const data = await response.text();
      const rows = data.split("\n");
      const companyList = rows.map((row) => {
        const columns = row.split(",");
        return { symbol: columns[0]?.trim(), name: columns[1]?.trim() };
      });

      setCompanies(companyList.slice(1));
    }
    fetchCSV();
  }, []);

  const searchCompanies = (query) => {
    setQuery(query);
    if (!query || !companies) {
      setSearchResults([]);
      return;
    }

    const regex = new RegExp(query, "i");
    const matches = companies.filter(
      (company) => regex.test(company.name) || regex.test(company.symbol)
    );

    setSearchResults(matches);
  };

  const selectCompany = (company) => {
    setTicker(company.symbol);
    setQuery(company?.name);
    setSearchResults([]);
    // You can handle the selected symbol here
  };

  return (
    <>
      {/* main div */}
      <div className="mt-14 md:mt-16 lg:mt-20 justify-center flex items-center">
        <input
          className="outline-none w-[70%] md:w-[50%] py-5 lg:w-[30%] rounded-tl-full rounded-bl-full bg-[#012E41] px-5 py-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter stock ticker"
          value={query}
          onChange={(e) => searchCompanies(e.target.value)}
        />
        <div className="bg-[#012E41] rounded-tr-full rounded-br-full  text-white">
          <IoIosSearch className="my-[0.75rem] md:cursor-pointer mx-5" />
        </div>
      </div>
      <div className="result-container">
        {searchResults.map((company, index) => (
          <p
            key={index}
            className="result-item"
            onClick={() => selectCompany(company)}
          >
            {company.name} ({company.symbol})
          </p>
        ))}
      </div>
    </>
  );
};

export default SearchBox;
