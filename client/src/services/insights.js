import axios from "axios";
import { setInsights } from "../store/slices/inshights";
import { configuration, URL } from "../utils";

// Fetch a quick insights
const getInsights = async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/insights`, configuration);
    dispatch(setInsights(data.insights));
  } catch (error) {
    console.error(error.response?.data.message || "Client : " + error.message);
  }
};

export { getInsights };
