import { FaRupeeSign } from "react-icons/fa";

const Banner = () => {
  return (
    <>
      {/* main div */}
      <div className="bg-[#012E41] text-4xl md:text-6xl p-4 md:p-8 flex items-center justify-between text-white lg:px-[10rem]">
        <h1 className="font-extrabold md:my-6">Stock Forecaster</h1>
        <FaRupeeSign className="md:my-6" />
      </div>
    </>
  );
};

export default Banner;
