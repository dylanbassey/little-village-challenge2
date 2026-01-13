import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const getContainerTypes = async () => {
  const response = await axios.get(`${BASE_URL}/containerTypes`);
  console.log(response.data);
  return response.data;
};
