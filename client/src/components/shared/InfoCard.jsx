
const InfoCard = ({ detail }) => {
  return (
    <div className="w-full relative md:w-[32.55%] h-[158px] rounded-lg bg-gray-700 border border-gray-600 p-4">
      <h3 className="text-[1.1rem] font-extrabold mb-3 text-white flex items-center gap-3">
        {detail.title}
      </h3>
      <p
        className={`${
          typeof detail.stats === "string"
            ? "md:text-xl font-semibold text-[1.1rem] text-white"
            : "md:text-2xl font-bold text-[1.4rem] text-white"
        }`}
      >
        {detail.stats}
      </p>
      <p className="text-sm text-gray-400 mt-2">Since last month</p>

      <div className="mt-3 section-border w-[100%] h-[7px] rounded-xl bg-[#383838] overflow-hidden">
        <div
          className={`h-full w-[${detail.range}%] bg-[#FFC260] transition-all duration-300`}
        ></div>
      </div>
    </div>
  );
};

export default InfoCard;
