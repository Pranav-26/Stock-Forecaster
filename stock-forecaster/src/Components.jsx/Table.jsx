import React from "react";

const Table = () => {
  return (
    <>
      <h1 className="text-xl md:text-4xl m-4 md:mt-8 font-semibold">
        Data from 2010-2014
      </h1>
      <div className="relative mt-4 overflow-x-auto  bg-[#012E41]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-[#012E41]">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 ">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" bg-[#012E41]">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Product-1
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-[#012E41]">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Product-2
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-[#012E41]">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Product-3
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3">3</td>
              <td className="px-6 py-3">21,000</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Table;
