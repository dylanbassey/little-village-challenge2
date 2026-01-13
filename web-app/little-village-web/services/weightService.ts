import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const getWeightRecords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/submitWeights`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weight records:", error);
  }
};
