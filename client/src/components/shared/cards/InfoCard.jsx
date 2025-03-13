const InfoCard = ({ detail }) => {
  return (
    <div className="w-full flex-grow relative md:w-[32.8%] h-[158px] rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary p-4 shadow">
      <h3 className="text-[16px] font-semibold mb-3 flex items-center gap-3">
        {detail.title}
      </h3>
      <p className="md:text-2xl font-bold text-[1.4rem]">
        {detail?.stats || 0}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Since last month
      </p>

      <div className="mt-3 section-border w-[100%] h-[7px] rounded-xl bg-[#383838] overflow-hidden">
        <div className="h-full w-full bg-[#FFC260] transition-all duration-300"></div>
      </div>
    </div>
  );
};

export default InfoCard;
