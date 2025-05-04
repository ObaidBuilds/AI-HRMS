import { FiRefreshCw } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getInsights } from "../../../services/insights.service";

const InfoCard = ({ detail }) => {
  const dispatch = useDispatch();

  function refreshInsights() {
    dispatch(getInsights());
  }

  return (
    <div className="w-full flex-grow relative md:w-[32.8%] h-[158px] rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary p-4 shadow flex flex-col">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base mb-3">
          {detail.title}
        </h3>
        {/* <button
          onClick={refreshInsights}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <FiRefreshCw size={15} />
        </button> */}
      </div>

      <p className="md:text-2xl font-bold text-[1.4rem]">
        {detail?.stats || 0}
      </p>

      <div className="flex items-center gap-2 mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Since last month
        </p>
      </div>

      <div className="mt-auto section-border w-[100%] h-[7px] rounded-xl bg-[#383838] overflow-hidden">
        <div className="h-full w-full bg-[#FFC260] transition-all duration-300"></div>
      </div>
    </div>
  );
};

export default InfoCard;
